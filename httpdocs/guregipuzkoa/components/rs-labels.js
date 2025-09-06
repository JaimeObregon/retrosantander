import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
import { labels } from '../../modules/labels.js'
import { css, html } from '../../modules/strings.js'

class Labels extends MyElement {
  static styles = css`
    a {
      text-decoration: none;
      text-transform: lowercase;
    }
  `

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    this.onLanguagechange = async () => {
      const language = i18n.getLanguage()

      const links = app.project.indices
        .filter(({ folder }) => folder === 'labels')
        .map(({ id, name }) => {
          const label = labels[name][language]
          return html` <a href="/etiketak/${id}">${label}</a> `
        })
        .join('')

      // TODO Esto corre dos veces

      this.container.innerHTML = html`<ol>
        ${links}
      </ol>`
    }

    // TODO No me gusta esto:
    this.onLanguagechange()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-labels')) {
  customElements.define('rs-labels', Labels)
}

export { Labels }
