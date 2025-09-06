import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css } from '../modules/strings.js'

class Title extends MyElement {
  static styles = css`
    :host {
      flex-grow: 1;
      overflow: hidden;
    }

    cite {
      box-sizing: border-box;
      display: block;
      max-width: 100%;
      margin-inline: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 500;
      color: var(--color-accent);
      text-align: center;
      white-space: nowrap;
      transition: width linear;
    }

    :host(.left) cite {
      margin-inline: 0;
      text-align: left;
    }

    @media (width <= 1280px) {
      cite {
        margin-inline: 0;
        text-align: left;
      }
    }

    @media (width <= 1024px) {
      cite {
        font-size: var(--type-small);
      }
    }
  `

  static html = `<cite></cite>`

  placeholder
  cite
  speeds = {
    deleting: 2,
    typing: 8,
  }

  resetDelay = 1000

  connectedCallback() {
    this.cite = this.shadowRoot?.querySelector('cite')

    this.placeholder = app.project.titles.default

    this.onLanguagechange = () => {
      const language = i18n.getLanguage()
      this.caption = this.placeholder[language]
    }

    this.onSearchcomplete = ({ detail }) => {
      const { query } = detail
      if (query) {
        const language = i18n.getLanguage()
        this.placeholder = app.project.titles.search(query)
        this.caption = this.placeholder[language]
      }
    }

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
    this.myAddEventListener(window, 'searchcomplete', this.onSearchcomplete)
  }

  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  set default(caption) {
    this.placeholder = caption
  }

  set caption(caption) {
    const language = i18n.getLanguage()
    const title = caption.trim() || this.placeholder[language]
    const previous = this.cite.innerText

    clearTimeout(this.resetTimeout)

    if (!this.resetTimeout && title === this.placeholder[language]) {
      this.resetTimeout = setTimeout(
        () => (this.caption = this.placeholder[language]),
        this.resetDelay,
      )
      return
    }

    this.resetTimeout = undefined

    const duration = previous.length * this.speeds.deleting

    this.cite.style.width = '0ch'
    this.cite.style.transitionDuration = `${duration}ms`

    this.timeout = setTimeout(() => {
      const duration = title.length * this.speeds.typing
      this.cite.innerText = title
      this.cite.style.width = `${title.length}ch`
      this.cite.style.transitionDuration = `${duration}ms`
    }, duration)
  }
}

if (!customElements.get('rs-title')) {
  customElements.define('rs-title', Title)
}

export { Title }
