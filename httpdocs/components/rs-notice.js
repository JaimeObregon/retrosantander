import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class Notice extends MyElement {
  static styles = css`
    :host {
      max-width: 70ch;
      margin: var(--gap);
    }

    :host(.hidden) {
      display: none;
    }
  `

  static html = html`<slot></slot>`

  async onLanguagechange() {
    const url = `notice.${app.language}.html`
    const response = await fetch(url)
    this.innerHTML = await response.text()
  }

  connectedCallback() {
    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }
}

if (!customElements.get('rs-notice')) {
  customElements.define('rs-notice', Notice)
}

export { Notice }
