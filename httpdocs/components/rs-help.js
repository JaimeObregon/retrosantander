import { app, escape } from '../modules/retrosantander.js'

const component = 'rs-help'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    article {
      max-width: 50rem;
      margin: auto;
      font-size: 18px;
      line-height: 1.5;
      padding: calc(var(--header-height) + var(--gap)) var(--gap);
    }

    article.hidden {
      display: none;
    }

    article li {
      margin: 0.5em 0;
    }

    article li a {
      color: inherit;
      font-weight: 800;
    }

    @media (max-width: 640px) {
      article {
        font-size: 16px;
        line-height: 1.35;
      }
    }
  </style>
  <article class="hidden">
    <h1>No hay imágenes sobre <q></q></h1>

    <p>
      La búsqueda se realiza sobre el título de la imagen consignado por el
      <abbr title="Centro de Documentación de la Imagen de Santander"
        >CDIS</abbr
      >. Si no encuentras lo que buscas, prueba con alguna de estas búsquedas
      de ejemplo:
    </p>

    <ul>
      <li>
        <a href="/?q=cicl"><q>cicl</q></a
        >, para mostrar imágenes de ciclismo y ciclistas.
      </li>
      <li>
        <a href="/?q=sardinero"><q>sardinero</q></a
        >, presenta escenas de El Sardinero.
      </li>
      <li>
        <a href="/?q=valde"><q>valde</q></a
        >, carga fotografías de Valdecilla, Valderredible, Valdeajos…
      </li>
      <li>
        <a href="/?q=cervatos"><q>cervatos</q></a
        >, para ver la Colegiata de Cervatos
      </li>
      <li>
        Usa la imaginación: <a href="/?q=jóvenes"><q>jóvenes</q></a
        >, <a href="/?q=desfile"><q>desfile</q></a
        >, <a href="/?q=racing"><q>racing</q></a
        >, <a href="/?q=retrato"><q>retrato</q></a
        >, <a href="/?q=piquio"><q>piquío</q></a
        >, <a href="/?q=puerto"><q>puerto</q></a
        >…
      </li>
    </ul>
  </article>
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
      this.article = this.shadowRoot.querySelector('article')
    }

    set hidden(value) {
      this.article.querySelector('q').innerHTML = escape(app.query)
      this.article.classList.toggle('hidden', value)
    }
  }
)
