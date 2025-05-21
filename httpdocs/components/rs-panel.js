import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'
import './rs-license-cc-by-sa.js'
import './rs-license-cdis.js'

const facesPerRow = 5

class Panel extends MyElement {
  static styles = css`
    :host {
      z-index: 1;
    }

    aside {
      position: fixed;
      top: var(--header-height);
      left: 0;
      box-sizing: border-box;
      width: 100%;
      max-width: var(--panel-width);
      height: calc(100% - var(--header-height));
      padding: var(--gap);
      overflow: scroll;
      background-color: var(--color-panel);
      border-right: 1px solid var(--color-line);
      box-shadow: 5px 0 5px var(--color-box-shadow);
      opacity: 1;
      backdrop-filter: blur(var(--panel-blur));
      transition: var(--delay-large);

      &.hidden {
        opacity: 0;
        transform: translateX(calc(-1 * var(--panel-width)));
      }

      button {
        position: absolute;
        top: 0.25em;
        right: 0.25em;
        width: 4em;
        height: 4em;
        padding: 0;
        cursor: pointer;
        background: transparent;
        border: none;
        border-radius: 100%;
        transition: background ease-in-out var(--delay-small);

        &:hover {
          background: var(--color-neutral-800);
        }

        svg {
          display: block;
          width: 25px;
          margin: auto;
          color: var(--color-neutral-500);
          stroke: currentcolor;
          stroke-width: 2px;
          transition: color ease-in-out var(--delay-small);

          path {
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        }

        &:hover svg {
          color: var(--color-neutral-400);
        }
      }

      h2 {
        margin: 0 0 10px;
        font-size: 11px;
        font-weight: 500;
        color: var(--color-neutral-400);
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      ul {
        padding: 0;
        margin: 0;
        line-height: 1.5;
        list-style: none;
      }

      section {
        font-weight: 500;

        &.hidden {
          display: none;
        }

        &:not(:first-of-type) h2 {
          margin-top: calc(2 * var(--gap));
        }

        ul li {
          display: inline;
          width: calc(100% / ${facesPerRow});
        }

        &#faces ul {
          --border-width: 3px;

          display: flex;
          flex-wrap: wrap;

          li {
            box-sizing: border-box;
            padding: var(--border-width);
            font-size: 0;

            img {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              background-repeat: no-repeat;
              border: var(--border-width) solid transparent;
              border-radius: 100%;

              &.active {
                border-color: var(--color-yellow-500);
              }
            }
          }
        }

        &#objects ul {
          li.active {
            color: var(--color-red-600);
          }
        }
      }

      a {
        color: inherit;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-decoration-style: dotted;

        &:hover {
          text-decoration-style: solid;
        }
      }

      .license {
        display: block;
        padding: var(--space-medium);
        margin: calc(2 * var(--gap)) 0 0;
        font-size: 14px;
        line-height: var(--line-height-condensed);
        hyphens: auto;
        background: var(--color-neutral-800);
        border-radius: 5px;
      }
    }

    @media (width <= 768px) {
      aside {
        top: auto;
        bottom: 0;
        height: 30vh;
        font-size: 14px;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        box-shadow: 0 -5px 5px var(--color-box-shadow);

        section#details dl {
          display: flex;
          flex-wrap: wrap;

          dt {
            width: 25px;
          }

          dd {
            width: calc(50% - 25px);
          }
        }
      }
    }
  `

  static html = html`
    <aside class="hidden">
      <button>
        <svg viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <rs-panel-details>
        <h2></h2>
        <dl></dl>
      </rs-panel-details>

      <section id="exif">
        <h2></h2>
        <dl></dl>
      </section>

      <section id="faces">
        <h2></h2>
        <ul></ul>
      </section>

      <section id="objects">
        <h2></h2>
        <ul></ul>
      </section>

      <section id="tags">
        <h2></h2>
        <ul></ul>
      </section>

      <footer></footer>
    </aside>
  `

  onLanguagechange() {
    const tagsHeading = this.aside?.querySelector('section#tags h2')
    const exifHeading = this.aside?.querySelector('section#exif h2')
    const facesHeading = this.aside?.querySelector('section#faces h2')
    const objectsHeading = this.aside?.querySelector('section#objects h2')

    if (!tagsHeading || !exifHeading || !facesHeading || !objectsHeading) {
      return
    }

    tagsHeading.innerHTML = i18n.get('panel.tags')
    exifHeading.innerHTML = i18n.get('panel.exif')

    if (!this.metadata) {
      return
    }

    const { faces, objects } = this.metadata

    faces.innerHTML = i18n.get(
      faces.length > 1 ? 'panel.faces.many' : 'panel.faces.one',
      { count: faces.length },
    )

    objectsHeading.innerHTML = i18n.get(
      objects.length > 1 ? 'panel.objects.many' : 'panel.objects.one',
      { count: objects.length },
    )
  }

  async connectedCallback() {
    i18n.push({
      'panel.faces.many': {
        es: '${count} personas',
        eu: '${count} gizakiak',
        en: '${count} people',
        fr: '${count} personnes',
      },
      'panel.faces.one': {
        es: 'Una persona',
        eu: 'Gizaki bat',
        en: 'One person',
        fr: 'Une personne',
      },
      'panel.objects.many': {
        es: '${count} objetos',
        eu: '${count} gauzak',
        en: '${count} objects',
        fr: '${count} objets',
      },
      'panel.objects.one': {
        es: 'Un objeto',
        eu: 'Gauza bat',
        en: 'One object',
        fr: 'Un objet',
      },
      'panel.details': {
        es: 'Ficha técnica',
        eu: 'Fitxa teknikoa',
        en: 'Data sheet',
        fr: 'Fiche technique',
      },
      'panel.tags': {
        es: 'Etiquetas automáticas',
        eu: 'Etiketa automatikoak',
        en: 'Automatic tags',
        fr: 'Étiquettes automatiques',
      },
      'panel.exif': {
        es: 'Metadatos Exif',
        eu: 'Exif metadatuak',
        en: 'Exif metadata',
        fr: 'Métadonnées EXIF',
      },
    })

    this.aside = this.shadowRoot?.querySelector('aside')
    this.details = this.shadowRoot?.querySelector('rs-panel-details')
    this.button = this.aside?.querySelector('button')
    this.footer = this.shadowRoot?.querySelector('footer')

    // @ts-ignore
    this.explorer = this.getRootNode().host

    if (!this.aside || !this.details || !this.button || !this.footer) {
      return
    }

    this.button.addEventListener('click', () => this.explorer.restore())

    this.aside.addEventListener('mouseover', (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return
      }

      if (event.target.dataset.id) {
        this.explorer.activeLayer = event.target.dataset.id
      }
    })

    this.aside.addEventListener('mouseout', (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return
      }

      if (event.target.dataset.id) {
        this.explorer.activeLayer = false
      }
    })

    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  set activeLayer(id) {
    this.aside?.querySelectorAll('section *[data-id]').forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.toggle('active', element.dataset.id === id)
      }
    })
  }

  set data(data) {
    const panel = this.shadowRoot?.querySelector('aside')

    if (!panel) {
      return
    }

    if (!data) {
      panel.classList.add('hidden')
      return
    }

    this.metadata = data

    const { faces, objects, tags, details, exif } = data

    if (!this.details) {
      return
    }

    this.details['data'] = data

    Array('faces', 'objects', 'tags').forEach((key) => {
      const section = this.shadowRoot?.querySelector(`section#${key}`)
      if (!section) {
        return
      }
      section.classList.toggle('hidden', !data[key].length)
    })

    const url = app.project.image(details.id)

    const ul = panel.querySelector('ul')

    if (!ul) {
      return
    }

    const containerWidth = ul.offsetWidth / facesPerRow
    const containerHeight = containerWidth

    const { width, height } = this.explorer.selected.getBoundingClientRect()
    const aspectRatio = width / height

    const facesList = panel.querySelector('section#faces ul')

    if (!facesList) {
      return
    }

    facesList.innerHTML = faces
      .map((face) => {
        const backgroundHeight = containerHeight / face.height
        const backgroundWidth = backgroundHeight * aspectRatio

        const realFaceWidth =
          (containerHeight * aspectRatio * face.width) / face.height

        const facePadding = (containerWidth - realFaceWidth) / 2 - 5

        const positionX = backgroundWidth * face.left - facePadding
        const positionY = backgroundHeight * face.top

        return `
            <li style="width: ${containerHeight}px; height: ${containerHeight}px">
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                data-id="${face.id}"
                alt="${face.name}"
                style="
                  background-image: url(${url});
                  background-size: ${backgroundWidth}px ${backgroundHeight}px;
                  background-position:
                    -${Math.max(positionX, 0)}px
                    -${Math.max(positionY, 0)}px;
                "
              />
            </li>
          `
      })
      .join('')

    const objectsList = panel.querySelector('section#objects ul')
    const exifList = panel.querySelector('section#exif dl')
    const tagsList = panel.querySelector('section#tags ul')

    if (!objectsList || !exifList || !tagsList) {
      return
    }

    objectsList.innerHTML = objects
      .map((object) => `<li data-id="${object.id}">${object.name}</li>`)
      .join(', ')

    exifList.innerHTML = Object.entries(exif)
      .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
      .join('')

    tagsList.innerHTML = tags
      .map(
        (tag) => `
            <li><a
                href="/?q=${tag.name}"
                title="«${tag.label}» (Confianza: ${tag.confidence} %)"
              >${tag.name}</a></li>`,
      )
      .join(', ')

    if (!this.footer) {
      return
    }

    const { license } = details

    if (license) {
      this.footer.innerHTML = html`
        <rs-license-${license} class="license"></rs-license-${license}>
      `
    }

    panel.classList.remove('hidden')
  }
}

if (!customElements.get('rs-panel')) {
  customElements.define('rs-panel', Panel)
}

export { Panel }
