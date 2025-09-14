import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'
import './rs-close-button.js'
import './rs-license-cc-by-sa.js'
import './rs-license-cdis.js'

const facesPerRow = 5

const hiddenExifKeys = [
  'ColorHalftoningInfo',
  'ColorTransferFuncs',
  'Directory',
  'ExifToolVersion',
  'FileAccessDate',
  'FileInodeChangeDate',
  'FileModifyDate',
  'FileName',
  'FilePermissions',
  'SourceFile',
]

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
      display: flex;
      flex-direction: column;
      gap: var(--space-medium);
      width: 100%;
      max-width: var(--panel-width);
      height: calc(100% - var(--header-height));
      padding: var(--space-medium);
      overflow: scroll;
      background-color: var(--color-panel);
      border-right: 1px solid var(--color-border);
      box-shadow: 5px 0 5px var(--color-box-shadow);
      opacity: 1;
      backdrop-filter: blur(var(--panel-blur));
      transition: var(--delay-large);

      &.hidden {
        opacity: 0;
        transform: translateX(calc(-1 * var(--panel-width)));
      }

      rs-close-button {
        position: absolute;
        top: var(--space-small);
        right: var(--space-small);
        width: 1.75em;
      }

      rs-panel-details {
        display: block;
      }

      section {
        &.hidden {
          display: none;
        }

        h2 {
          margin: 0 0 var(--space-x-small) 0;
          font-size: var(--type-xx-small);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        ul {
          padding: 0;
          margin: 0;
          font-size: var(--type-small);
          line-height: var(--line-height-condensed);
          list-style: none;

          li {
            display: inline;
            font-weight: 500;

            a {
              color: var(--color-link);
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }

        &#faces ul {
          --border-width: 3px;

          display: flex;
          flex-wrap: wrap;

          li {
            box-sizing: border-box;
            width: calc(100% / ${facesPerRow});
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
                border-color: var(--color-area-face);
              }
            }
          }
        }

        &#indices:has(ul:empty) {
          display: none;
        }

        &#exif {
          dl {
            margin: 0;
            font-size: var(--type-xx-small);

            dt {
              font-weight: 500;
              font-variant: small-caps;
            }

            dd {
              margin: 0;
              font-family: var(--font-mono);
              color: var(--color-highlight);

              &:not(:last-child) {
                margin-bottom: var(--space-small);
              }
            }
          }
        }
      }

      footer {
        display: block;
        padding: var(--space-medium);
        font-size: var(--type-x-small);
        line-height: var(--line-height-condensed);
        hyphens: auto;
        background: var(--color-border);
        border-radius: 4px;

        &:empty {
          display: none;
        }

        a {
          color: var(--color-link);
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;

          &:hover {
            color: var(--color-link-hover);
            text-decoration: none;
            background-color: var(--color-link);
          }

          abbr {
            text-decoration: none;
            cursor: help;
          }
        }
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
      }
    }
  `

  static html = html`
    <aside class="hidden">
      <rs-close-button></rs-close-button>

      <section>
        <h2></h2>
        <rs-panel-details></rs-panel-details>
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

      <section id="indices">
        <h2></h2>
        <ul></ul>
      </section>

      <footer></footer>

      <section id="exif">
        <h2></h2>
        <dl></dl>
      </section>
    </aside>
  `

  render() {
    const detailsHeading = this.aside?.querySelector('h2')
    const tagsHeading = this.aside?.querySelector('section#tags h2')
    const exifHeading = this.aside?.querySelector('section#exif h2')
    const facesHeading = this.aside?.querySelector('section#faces h2')
    const objectsHeading = this.aside?.querySelector('section#objects h2')
    const indicesHeading = this.aside?.querySelector('section#indices h2')

    if (
      !detailsHeading ||
      !tagsHeading ||
      !exifHeading ||
      !facesHeading ||
      !objectsHeading ||
      !indicesHeading
    ) {
      return
    }

    detailsHeading.innerHTML = i18n.get('panel.details')
    tagsHeading.innerHTML = i18n.get('panel.tags')
    exifHeading.innerHTML = i18n.get('panel.exif')
    indicesHeading.innerHTML = i18n.get('panel.indices')

    if (!this.metadata) {
      return
    }

    const { faces, objects } = this.metadata

    facesHeading.innerHTML = i18n.get(
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
        eu: '${count} pertsona',
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
        eu: '${count} objektu',
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
        en: 'Technical sheet',
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
        en: 'EXIF metadata',
        fr: 'Métadonnées EXIF',
      },
      'panel.indices': {
        es: 'Aparece también en',
        eu: 'Honetan ere ageri da',
        en: 'Also appears in',
        fr: 'Apparaît aussi dans',
      },
    })

    this.aside = this.shadowRoot?.querySelector('aside')
    this.details = this.shadowRoot?.querySelector('rs-panel-details')
    this.button = this.aside?.querySelector('rs-close-button')
    this.footer = this.shadowRoot?.querySelector('footer')

    // @ts-ignore
    this.explorer = this.getRootNode().host

    this.onClick = () => this.explorer.restore()

    this.onMouseover = ({ target }) => {
      if (!(target instanceof HTMLElement)) {
        return
      }

      if (target.dataset.id) {
        this.explorer.activeLayer = target.dataset.id
      }
    }

    this.onMouseout = ({ target }) => {
      if (!(target instanceof HTMLElement)) {
        return
      }

      if (target.dataset.id) {
        this.explorer.activeLayer = false
      }
    }

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(this.button, 'click', this.onClick)
    this.myAddEventListener(this.aside, 'mouseover', this.onMouseover)
    this.myAddEventListener(this.aside, 'mouseout', this.onMouseout)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }

  set activeLayer(id) {
    const elements = this.aside?.querySelectorAll('section *[data-id]')
    elements?.forEach((element) => {
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

    this.render()

    const { json, faces, objects, tags } = data

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

    const url = app.project.image(data.id)

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

        return html`
          <li>
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
    const indicesList = panel.querySelector('section#indices ul')

    if (!objectsList || !exifList || !tagsList || !indicesList) {
      return
    }

    objectsList.innerHTML = objects
      .map((object) => html`<li data-id="${object.id}">${object.name}</li>`)
      .join(', ')

    exifList.innerHTML = Object.entries(json.exif)
      .filter(([key]) => !hiddenExifKeys.includes(key))
      .map(
        ([key, value]) => html`
          <dt>${key}</dt>
          <dd>${String(value).replace(', use -b option to extract', '')}</dd>
        `,
      )
      .join('')

    tagsList.innerHTML = tags
      .map((tag) => {
        const href = `/?q=${tag.label}`
        const title = `«${tag.label}» (Confianza: ${tag.confidence} %)`
        const label = tag.label
        return html`<li><a href="${href}" title="${title}">${label}</a></li>`
      })
      .join(', ')

    if (json.indices) {
      indicesList.innerHTML = json.indices
        .filter((index) => {
          const [type] = index.split('/')
          return type !== 'labels'
        })
        .map((index) => html`<li><a href="">${index}</a></li>`)
        .join(', ')
    }

    if (!this.footer) {
      return
    }

    const { license } = json.details

    if (license) {
      this.footer.innerHTML = html`
        <rs-license-${license}></rs-license-${license}>
      `
    }

    panel.classList.remove('hidden')
  }
}

if (!customElements.get('rs-panel')) {
  customElements.define('rs-panel', Panel)
}

export { Panel }
