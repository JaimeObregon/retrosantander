import { app } from '../modules/retrosantander.js'

const component = 'rs-panel'
const template = document.createElement('template')
const containerHeight = 80

template.innerHTML = `
  <style>
    aside {
      position: fixed;
      width: 100%;
      max-width: var(--details-width);
      height: calc(100% - var(--header-height));
      top: var(--header-height);
      left: 0;
      overflow: scroll;
      box-sizing: border-box;
      padding: var(--gap);
      border-right: 1px solid var(--color-neutral-700);
      box-shadow: 5px 0 5px #1c191750;
      background-color: #171717f0;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: 350ms;
    }

    aside.hidden {
      transform: translateX(calc(-1 * var(--details-width)));
    }

    aside button {
      position: absolute;
      width: 4em;
      height: 4em;
      top: .25em;
      right: .25em;
      padding: 0;
      border-radius: 100%;
      border: none;
      background: transparent;
      transition: background ease-in-out 150ms;
      cursor: pointer;
    }

    aside button:hover {
      background: var(--color-neutral-800);
    }

    aside button svg {
      display: block;
      width: 25px;
      margin: auto;
      stroke: currentColor;
      stroke-width: 2px;
      color: var(--color-neutral-500);
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
      font-size: 11px;
      margin: 0 0 10px 0;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-neutral-400);
    }

    aside ul {
      margin: 0;
      padding: 0;
      line-height: 1.5;
      list-style: none;
    }

    aside section ul li {
      display: inline;
    }

    aside a {
      color: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
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
      margin-top: calc(3 * var(--gap));
    }

    aside section#details svg {
      width: 20px;
      vertical-align: middle;
      stroke: currentColor;
      stroke-width: 2px;
      fill: none;
    }

    aside section#details dl {
      display: grid;
      grid-template-columns: 25px auto;
      grid-template-rows: auto;
      row-gap: calc(var(--gap) / 3);
      margin: 0;
    }

    aside section#details dl dd {
      grid-column-start: 2;
      display: flex;
      align-items: center;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    aside section#details dl dt svg path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    aside section#details dl dt,
    aside section#details dl dd {
      vertical-align: middle;
    }

    aside section#details abbr {
      cursor: help;
    }

    aside details {
      font-size: 14px;
      font-weight: 400;
      margin: var(--gap) 0;
      padding: 0 22px 5px 22px;
      border-radius: 5px;
      background: var(--color-neutral-800);
      hyphens: auto;
    }

    aside details summary {
      padding: 10px 7px;
      margin: 0 -22px -10px -22px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 5px;
      hyphens: none;
      cursor: pointer;
      transition: background ease-in-out 150ms;
      background: inherit;
    }

    aside details summary:hover {
      background: var(--color-neutral-700);
    }

    aside details p {
      color: var(--color-neutral-300);
    }

    aside section#faces ul {
      --border-width: 3px;
      display: flex;
      flex-wrap: wrap;
    }

    aside section#faces ul li {
      font-size: 0;
      height: ${containerHeight}px;
      padding: var(--border-width);
      box-sizing: border-box;
    }

    aside section#objects ul li.active {
      color: var(--color-red-600);
    }

    aside section#faces ul li img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: var(--border-width) solid transparent;
      border-radius: 3px;
      background-repeat: no-repeat;
    }

    aside section#faces ul li img.active {
      border-color: var(--color-yellow-500);
    }
  </style>
  <aside class="hidden">
    <button>
      <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <section id="details">
      <h2>Ficha técnica</h2>

      <dl>
        <dt title="Fecha">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </dt>
        <dd id="date"></dd>
        <dt title="Colección o fondo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        </dt>
        <dd id="collection"></dd>
        <dt title="Fotógrafo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </dt>
        <dd id="author"></dd>
        <dt title="Material">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </dt>
        <dd id="material"></dd>
        <dt title="Procedimiento">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </dt>
        <dd id="procedure"></dd>
        <dt title="Referencia">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </dt>
        <dd id="link">
          <a href="" target="cdis"></a>
        </dd>
      </dl>
    </section>

    <details>
      <summary>Derechos de esta imagen</summary>

      <p>
        Esta imagen es obra de su autor, y sus derechos pertenecen al Centro de
        Documentación de la Imagen de Santander (CDIS), una entidad dependiente
        del Ayuntamiento de Santander.
      </p>

      <p>
        Por favor <a href="https://portal.ayto-santander.es/portalcdis/" target="cdis">contacta
        con el CDIS</a> y adquiere la versión de alta resolución antes de hacer
        una utilización comercial de esta imagen.
      </p>
    </details>

    <section id="faces">
      <h2>Personas detectadas</h2>
      <ul></ul>
    </section>

    <section id="objects">
      <h2>Objetos detectados</h2>
      <ul></ul>
    </section>

    <section id="tags">
      <h2>Etiquetas detectadas</h2>
      <ul></ul>
    </section>
  </aside>
`

customElements.define(
  component,

  class extends HTMLElement {
    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.aside = this.shadowRoot.querySelector('aside')
      this.button = this.aside.querySelector('button')

      this.button.addEventListener('click', () => app.restore())

      this.aside.addEventListener('mouseover', (event) => {
        if (event.target.dataset.id) {
          app.activeLayer = event.target.dataset.id
        }
      })

      this.aside.addEventListener('mouseout', (event) => {
        if (event.target.dataset.id) {
          app.activeLayer = false
        }
      })
    }

    set activeLayer(id) {
      this.aside.querySelectorAll('section *[data-id]').forEach((element) => {
        element.classList.toggle('active', element.dataset.id === id)
      })
    }

    set contents(contents) {
      const panel = this.shadowRoot.querySelector('aside')

      if (!contents) {
        panel.classList.add('hidden')
        return
      }

      const { details, faces, objects, tags } = contents

      panel.querySelector('#date').innerText = details.date
      panel.querySelector('#collection').innerText = details.collection
      panel.querySelector('#author').innerText = details.author
      panel.querySelector('#material').innerText = details.material
      panel.querySelector('#procedure').innerText = details.procedure

      const href = `http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${details.file}`
      panel.querySelector('#link a').setAttribute('href', href)
      panel.querySelector('#link a').innerHTML = `
        Ver #${details.id} en el
        <abbr title="Centro de Documentación de la Imagen de Santander">CDIS</abbr>`

      Array('faces', 'objects', 'tags').forEach((key) => {
        this.shadowRoot
          .querySelector(`section#${key}`)
          .classList.toggle('hidden', !contents[key].length)
      })

      const { width, height } = app.selected.getBoundingClientRect()
      const aspectRatio = width / height

      alert(JSON.stringify(app.selected.getBoundingClientRect(), null, 2))

      panel.querySelector('section#faces ul').innerHTML = faces
        .map((face) => {
          const width =
            (containerHeight * aspectRatio * face.width) / face.height + 4
          const height = containerHeight / face.height

          return `
            <li style="width: ${width}px;">
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                data-id="${face.id}"
                alt="${face.name}"
                style="
                  background-image: url(https://portal.ayto-santander.es/portalcdis/image/DownloadFileExposicion.do?id=${
                    details.id
                  });
                  background-position:
                    -${Math.max(height * aspectRatio * face.left, 0)}px
                    -${Math.max(height * face.top, 0)}px;
                  background-size: auto ${height}px;
                "
              />
            </li>
          `
        })
        .join('')

      panel.querySelector('section#objects ul').innerHTML = objects
        .map((object) => `<li data-id="${object.id}">${object.name}</li>`)
        .join(', ')

      panel.querySelector('section#tags ul').innerHTML = tags
        .map(
          (tag) => `
            <li><a
                href="/?q=${tag.name}"
                title="«${tag.label}» (Confianza: ${tag.confidence} %)"
              >${tag.name}</a></li>`
        )
        .join(', ')

      panel.classList.remove('hidden')
    }
  }
)
