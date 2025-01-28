import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, escape, html } from '../modules/strings.js'

class Help extends MyElement {
  static styles = css`
    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 42em;
      min-height: calc(100vh - var(--header-height));
      margin: auto;
      font-size: 18px;
      line-height: 1.5;
    }

    article.hidden {
      display: none;
    }

    article h1 {
      margin: 0;
      color: var(--color-highlight);
    }

    @media (width <= 640px) {
      article {
        font-size: 15px;
        line-height: 1.35;
      }
    }
  `

  static html = html`
    <article class="hidden">
      <h1></h1>
      <slot></slot>
    </article>
  `

  article

  constructor() {
    super()

    i18n.push({
      'search.zero_results': {
        es: 'No hay imágenes sobre <q>${query}</q>',
        eu: 'Ez dago <q>${query}</q>-ri buruzko argazkirik',
        en: 'There are no photographs about <q>${query}</q>',
        fr: "Il n'y a pas de photos sur <q>${query}</q>",
      },
    })
  }

  async onLanguagechange() {
    const query = escape(app.query)
    this.article.querySelector('h1').innerHTML = i18n.get(
      'search.zero_results',
      { query },
    )

    const url = `help.${app.language}.html`
    const response = await fetch(url)
    app.$help.innerHTML = await response.text()
  }

  connectedCallback() {
    this.article = this.shadowRoot?.querySelector('article')
    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  set hidden(value) {
    const query = escape(app.query)
    this.article.querySelector('h1').innerHTML = i18n.get(
      'search.zero_results',
      { query },
    )
    this.article.classList.toggle('hidden', value)
  }
}

export { Help }
