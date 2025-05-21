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
      overflow: hidden;
      font-size: 0;
      border-radius: 4px;

      img {
        width: 100%;
        cursor: pointer;
        transition: ease-out var(--delay-large);
      }

      div {
        position: absolute;
        cursor: pointer;
        border: 1px solid;
        border-radius: 4px;
        opacity: 0;
        transition: ease-out var(--delay-large);

        &.active {
          transition: ease-out var(--delay-small);
          animation: pulsate ease-in-out alternate infinite 1s;
        }

        &.face {
          border-color: var(--color-image-face);
          border-radius: 100%;

          &.active {
            background: color-mix(
              in srgb,
              var(--color-image-face) 50%,
              transparent
            );
          }
        }

        &.object {
          border-color: var(--color-image-object);

          &.active {
            background: color-mix(
              in srgb,
              var(--color-image-object) 50%,
              transparent
            );
          }
        }
      }
    }

    :host(:not(.selected)) figure img:hover {
      transform: scale(1.05);
      transition: transform ease-out var(--delay-x-small);
    }

    :host(.selected) figure {
      :is(&:hover, &.active) div {
        opacity: 1;
      }
    }
  `

  static html = html`<figure><img /></figure>`

  figure
  img
  id

  connectedCallback() {
    this.img = this.shadowRoot?.querySelector('img')
    this.figure = this.shadowRoot?.querySelector('figure')
    this.id = this.getAttribute('id')

    // @ts-ignore
    this.explorer = this.getRootNode().host

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

      this.explorer.activeLayer = event.target.dataset.id
    })

    this.figure.addEventListener('mouseout', (event) => {
      const isDiv = event.target instanceof HTMLDivElement
      if (isDiv) {
        this.explorer.activeLayer = false
      }
    })
  }

  set areas(areas) {
    this.figure.querySelectorAll('div').forEach((div) => div.remove())

    if (!areas) {
      return
    }

    areas
      .sort((a, b) => (a.area < b.area ? 1 : -1))
      .forEach((area) => {
        const div = document.createElement('div')
        div.className = area.type
        div.dataset.id = area.id
        div.dataset.name = area.id
        div.dataset.title = area.title
        div.style.top = `${area.top}%`
        div.style.left = `${area.left}%`
        div.style.width = `${area.width}%`
        div.style.height = `${area.height}%`
        this.figure.append(div)
      })
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

if (!customElements.get('rs-image')) {
  customElements.define('rs-image', Image)
}

export { Image }
