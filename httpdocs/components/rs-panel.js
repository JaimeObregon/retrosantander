import { MyElement, html, css } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { app } from '../modules/app.js'

import { LicenseCDIS } from './rs-license-cdis.js'
import { LicenseCCBYSA } from './rs-license-cc-by-sa.js'

const facesPerRow = 5

class Panel extends MyElement {
  static styles = css`
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
      background-color: rgba(var(--color-panel-components), 0.941);
      backdrop-filter: blur(14px);
      border-right: 1px solid var(--color-line);
      box-shadow: 5px 0 5px #1c191750;
      opacity: 1;
      transition: 350ms;
    }

    aside.hidden {
      opacity: 0;
      transform: translateX(calc(-1 * var(--panel-width)));
    }

    aside button {
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
      transition: background ease-in-out 150ms;
    }

    aside button:hover {
      background: var(--color-neutral-800);
    }

    aside button svg {
      display: block;
      width: 25px;
      margin: auto;
      color: var(--color-neutral-500);
      stroke: currentcolor;
      stroke-width: 2px;
      transition: color ease-in-out 150ms;
    }

    aside button:hover svg {
      color: var(--color-neutral-400);
    }

    aside button svg path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    aside h2 {
      margin: 0 0 10px;
      font-size: 11px;
      font-weight: 500;
      color: var(--color-neutral-400);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    aside ul {
      padding: 0;
      margin: 0;
      line-height: 1.5;
      list-style: none;
    }

    aside section ul li {
      display: inline;
      width: calc(100% / ${facesPerRow});
    }

    aside a {
      color: inherit;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-style: dotted;
    }

    aside a:hover {
      text-decoration-style: solid;
    }

    aside section {
      font-weight: 500;
    }

    aside section.hidden {
      display: none;
    }

    aside section:not(:first-of-type) h2 {
      margin-top: calc(2 * var(--gap));
    }

    aside section#faces ul {
      --border-width: 3px;

      display: flex;
      flex-wrap: wrap;
    }

    aside section#faces ul li {
      box-sizing: border-box;
      padding: var(--border-width);
      font-size: 0;
    }

    aside section#objects ul li.active {
      color: var(--color-red-600);
    }

    aside section#faces ul li img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      border: var(--border-width) solid transparent;
      border-radius: 100%;
    }

    aside section#faces ul li img.active {
      border-color: var(--color-yellow-500);
    }

    aside rs-license-cc-by-sa {
      display: block;
      margin-top: calc(2 * var(--gap));
    }

    @media (width <= 768px) {
      aside {
        top: auto;
        bottom: 0;
        height: 30vh;
        font-size: 14px;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        box-shadow: 0 -5px 5px #1c191750;
      }

      aside section#details dl {
        display: flex;
        flex-wrap: wrap;
      }

      aside section#details dl dt {
        width: 25px;
      }

      aside section#details dl dd {
        width: calc(50% - 25px);
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

  constructor() {
    super()

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
  }

  onLanguagechange() {
    this.aside.querySelector('section#tags h2').innerHTML =
      i18n.get('panel.tags')
    this.aside.querySelector('section#exif h2').innerHTML =
      i18n.get('panel.exif')

    if (!this.metadata) {
      return
    }

    const { faces, objects } = this.metadata

    this.aside.querySelector('section#faces h2').innerHTML = i18n.get(
      faces.length > 1 ? 'panel.faces.many' : 'panel.faces.one',
      { count: faces.length },
    )

    this.aside.querySelector('section#objects h2').innerHTML = i18n.get(
      objects.length > 1 ? 'panel.objects.many' : 'panel.objects.one',
      { count: objects.length },
    )
  }

  async connectedCallback() {
    this.aside = this.shadowRoot.querySelector('aside')
    this.details = this.shadowRoot.querySelector('rs-panel-details')
    this.button = this.aside.querySelector('button')
    this.footer = this.shadowRoot.querySelector('footer')

    const { PanelDetails } = await import(
      `../${app.project.folder}/components/rs-panel-details.js`
    )

    customElements.define('rs-panel-details', PanelDetails)
    customElements.define('rs-license-cdis', LicenseCDIS)
    customElements.define('rs-license-cc-by-sa', LicenseCCBYSA)

    this.sounds = {
      open: new Audio('/assets/sounds/activate.mp3'),
      close: new Audio('/assets/sounds/deactivate.mp3'),
    }

    this.button.addEventListener('click', () => app.$grid.restore())

    this.aside.addEventListener('mouseover', (event) => {
      if (event.target.dataset.id) {
        app.$grid.activeLayer = event.target.dataset.id
      }
    })

    this.aside.addEventListener('mouseout', (event) => {
      if (event.target.dataset.id) {
        app.$grid.activeLayer = false
      }
    })

    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  set activeLayer(id) {
    this.aside.querySelectorAll('section *[data-id]').forEach((element) => {
      element.classList.toggle('active', element.dataset.id === id)
    })
  }

  set data(data) {
    const panel = this.shadowRoot.querySelector('aside')

    if (!data) {
      !panel.classList.contains('hidden') && this.sounds.close.play()
      panel.classList.add('hidden')
      return
    }

    this.metadata = data

    const { faces, objects, tags, details, exif } = data

    this.details.data = data

    Array('faces', 'objects', 'tags').forEach((key) => {
      this.shadowRoot
        .querySelector(`section#${key}`)
        .classList.toggle('hidden', !data[key].length)
    })

    const url = app.project.image(details.id)

    const containerWidth = panel.querySelector('ul').offsetWidth / facesPerRow
    const containerHeight = containerWidth

    const { width, height } = app.$grid.selected.getBoundingClientRect()
    const aspectRatio = width / height

    panel.querySelector('section#faces ul').innerHTML = faces
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

    panel.querySelector('section#objects ul').innerHTML = objects
      .map((object) => `<li data-id="${object.id}">${object.name}</li>`)
      .join(', ')

    panel.querySelector('section#exif dl').innerHTML = Object.entries(exif)
      .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
      .join('')

    panel.querySelector('section#tags ul').innerHTML = tags
      .map(
        (tag) => `
            <li><a
                href="/?q=${tag.name}"
                title="«${tag.label}» (Confianza: ${tag.confidence} %)"
              >${tag.name}</a></li>`,
      )
      .join(', ')

    if (details.license === 'cdis') {
      this.footer.innerHTML = `<rs-license-cdis></rs-license-cdis>`
    } else if (details.license === 'cc-by-sa') {
      this.footer.innerHTML = `<rs-license-cc-by-sa></rs-license-cc-by-sa>`
    }

    panel.classList.contains('hidden') && this.sounds.open.play()
    panel.classList.remove('hidden')
  }
}

export { Panel }
