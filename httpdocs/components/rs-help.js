import { app, escape } from '../modules/retrosantander.js'

const component = 'rs-help'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 18px;
      max-width: 42em;
      min-height: calc(100vh - var(--header-height));
      margin: auto;
      line-height: 1.5;
    }

    article.hidden {
      display: none;
    }

    article h1 {
      margin: 0;
    }

    @media (max-width: 640px) {
      article {
        font-size: 15px;
        line-height: 1.35;
      }
    }
  </style>
  <article class="hidden">
    <h1>No hay imágenes sobre <q></q></h1>

    <slot></slot>
  </article>
`

customElements.define(
  component,

  class extends HTMLElement {
    article

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
