import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css } from '../modules/strings.js'

class Notice extends MyElement {
  static styles = css`
    :host {
      max-width: 70ch;
      margin: var(--space-medium);
    }

    :host(.hidden) {
      display: none;
    }
  `

  static html = `<slot></slot>`

  async loadNotice() {
    const language = i18n.getLanguage()

    const url = `notice.${language}.html`
    const response = await fetch(url)
    this.innerHTML = await response.text()
  }

  onLanguagechange() {
    this.loadNotice()
  }

  onSearchcomplete(event) {
    const { results } = event.detail
    const hidden = Boolean(results.length)
    this.classList.toggle('hidden', hidden)
  }

  connectedCallback() {
    this.loadNotice()
    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
    window.addEventListener('searchcomplete', this.onSearchcomplete.bind(this))
  }
}

if (!customElements.get('rs-notice')) {
  customElements.define('rs-notice', Notice)
}

export { Notice }
