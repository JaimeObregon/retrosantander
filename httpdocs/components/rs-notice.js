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

  connectedCallback() {
    this.loadNotice()

    this.onLanguagechange = () => {
      this.loadNotice()
    }

    this.onSearchcomplete = (event) => {
      const { results } = event.detail
      const hidden = Boolean(results.length)
      this.classList.toggle('hidden', hidden)
    }

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
    this.myAddEventListener(window, 'searchcomplete', this.onSearchcomplete)
  }
}

if (!customElements.get('rs-notice')) {
  customElements.define('rs-notice', Notice)
}

export { Notice }
