import { app } from '../modules/app.js'
import { database } from '../modules/database.js'
import { MyElement } from '../modules/element.js'
import { labels } from '../modules/labels.js'
import { css, escape, html } from '../modules/strings.js'

class Image extends MyElement {
  static styles = css`
    @keyframes pulsate {
      from {
        transform: scale(100%);
      }

      to {
        transform: scale(107.5%);
      }
    }

    figure {
      position: relative;
      margin: 0;
      font-size: 0;
    }

    figure img {
      width: 100%;
      cursor: pointer;
      border-radius: 4px;
    }

    figure div {
      position: absolute;
      cursor: pointer;
      border: 1px solid;
      border-radius: 3px;
      opacity: 0;
      transition: ease-out 350ms;
    }

    :host(.selected) figure:hover div,
    :host(.selected) figure.active div {
      opacity: 1;
    }

    figure div.active {
      transition: ease-out 150ms;
      animation: pulsate ease-in-out alternate infinite 1s;
    }

    figure div.face {
      border-color: var(--color-yellow-500);
      border-radius: 100%;
    }

    figure div.object {
      border-color: var(--color-accent);
    }

    figure div.face.active {
      background: #eab30870;
    }

    figure div.object.active {
      background: #dc262670;
    }
  `

  static html = html`
    <figure>
      <img loading="lazy" />
    </figure>
  `

  figure
  img
  id

  connectedCallback() {
    this.img = this.shadowRoot?.querySelector('img')
    this.figure = this.shadowRoot?.querySelector('figure')
    this.id = this.getAttribute('id')

    const details = database.find(this.id)
    const src = app.project.image(this.id)

    if (!details) {
      return
    }

    this.img.setAttribute('src', src)
    this.img.setAttribute('alt', escape(details.title))

    this.figure.addEventListener('mouseover', (event) => {
      const isDiv = event.target instanceof HTMLDivElement
      if (!isDiv) {
        return
      }

      app.$grid.activeLayer = event.target.dataset.id
    })

    this.figure.addEventListener('mouseout', (event) => {
      const isDiv = event.target instanceof HTMLDivElement
      if (isDiv) {
        app.$grid.activeLayer = false
      }
    })
  }

  set areas(areas) {
    this.figure.querySelectorAll('div').forEach((div) => div.remove())

    if (!areas) {
      return
    }

    this.figure.innerHTML += areas
      .sort((a, b) => (a.area < b.area ? 1 : -1))
      .map(
        (area) => html`
          <div
            class="${area.type}"
            data-id="${area.id}"
            data-name="${area.id}"
            data-title="${area.title}"
            style="
            top: ${area.top}%;
            left: ${area.left}%;
            width: ${area.width}%;
            height: ${area.height}%
          "
          ></div>
        `,
      )
      .join('')
  }

  get complete() {
    return this.shadowRoot?.querySelector('img')?.complete
  }

  get activeLayer() {
    return this.figure.querySelector('div.active').dataset.title
  }

  set activeLayer(id) {
    this.figure.classList.toggle('active', id)
    const divs = [...this.figure.querySelectorAll('div')]
    divs.map((div) => div.classList.toggle('active', div.dataset.id === id))
  }

  // Carga e interpreta el fichero JSON con los metadatos de una imagen.
  async getMetadata() {
    const url = app.project.metadata(this.id)

    const response = await fetch(url)

    const json = await response.json()

    const { exif, details } = json

    const gender = (value) =>
      ({
        Male: 'Hombre',
        Female: 'Mujer',
      })[value]

    const { confidenceThreshold } = app.project

    const faces = json.faces.FaceDetails.filter(
      (face) => face.Confidence >= confidenceThreshold,
    ).map((face, i) => ({
      type: 'face',
      id: `face-${i}`,
      name: `${gender(face.Gender.Value)} ${i + 1}`,
      title: [
        `${gender(face.Gender.Value)} nº ${i + 1},`,
        `de entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      ].join(' '),
      top: face.BoundingBox.Top,
      left: face.BoundingBox.Left,
      width: face.BoundingBox.Width,
      height: face.BoundingBox.Height,
      confidence: face.Confidence,
      age: `Entre ${face.AgeRange.Low} y ${face.AgeRange.High} años`,
      emotions: face.Emotions.map((emotion) => ({
        confidence: emotion.Confidence,
        name: {
          CALM: 'Tranquilo',
          SURPRISED: 'Sorprendido',
          FEAR: 'Asustado',
          SAD: 'Triste',
          DISGUSTED: 'Disgustado',
          CONFUSED: 'Confundido',
          HAPPY: 'Contento',
          ANGRY: 'Enfadado',
        }[emotion.Type],
      })).filter((emotion) => emotion.confidence > confidenceThreshold),
      ...(face.Gender.Confidence > confidenceThreshold && {
        gender: gender(face.Gender.Value),
      }),
      ...(face.Beard.Confidence > confidenceThreshold && {
        beard: face.Beard.Value,
      }),
      ...(face.Eyeglasses.Confidence > confidenceThreshold && {
        glasses: face.Eyeglasses.Value,
      }),
      ...(face.EyesOpen.Confidence > confidenceThreshold && {
        eyes: face.EyesOpen.Value,
      }),
      ...(face.MouthOpen.Confidence > confidenceThreshold && {
        mouth: face.MouthOpen.Value,
      }),
      ...(face.Mustache.Confidence > confidenceThreshold && {
        mustache: face.Mustache.Value,
      }),
      ...(face.Smile.Confidence > confidenceThreshold && {
        smile: face.Smile.Value,
      }),
      ...(face.Sunglasses.Confidence > confidenceThreshold && {
        sunglasses: face.Sunglasses.Value,
      }),
    }))

    const objects = json.labels.Labels.filter(
      (object) => object.Instances.length,
    ).reduce(
      (accumulator, object) => [
        ...accumulator,
        ...object.Instances.filter(
          (instance) => instance.Confidence >= confidenceThreshold,
        ).map((instance, i) => ({
          type: 'object',
          id: `object-${accumulator.length + i}`,
          name: `${labels[object.Name]} ${i + 1}`,
          title: labels[object.Name],
          confidence: instance.Confidence,
          top: instance.BoundingBox.Top,
          left: instance.BoundingBox.Left,
          width: instance.BoundingBox.Width,
          height: instance.BoundingBox.Height,
        })),
      ],
      [],
    )

    const tags = json.labels.Labels.filter((label) => !label.Instances.length)
      .filter((label) => label.Confidence > confidenceThreshold)
      .map((label) => ({
        name: labels[label.Name],
        label: label.Name,
        confidence: label.Confidence,
      }))

    const areas = [...faces, ...objects].map((area) => ({
      id: area.id,
      title: area.title,
      type: area.type,
      confidence: area.confidence,
      top: 100 * area.top,
      left: 100 * area.left,
      width: 100 * area.width,
      height: 100 * area.height,
      area: 10000 * area.width * area.height,
    }))

    return { faces, objects, tags, areas, details, exif }
  }
}

export { Image }
