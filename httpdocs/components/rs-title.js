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
      overflow: hidden;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 500;
      color: var(--color-accent);
      white-space: nowrap;
      transition: width linear;
    }

    @media (width <= 1280px) {
      cite {
        margin: 0;
        text-align: left;
      }
    }

    @media (width <= 1024px) {
      cite {
        font-size: var(--type-x-small);
      }
    }
  `

  static html = `<cite></cite>`

  default
  cite
  speeds = {
    deleting: 2,
    typing: 8,
  }

  resetDelay = 1000

  connectedCallback() {
    this.cite = this.shadowRoot?.querySelector('cite')

    i18n.push({
      'title.default': app.project.title,
    })

    this.onLanguagechange = () => {
      this.default = i18n.get('title.default')
      this.caption = this.default
    }

    this.onSearchcomplete = () => {
      this.caption = this.default
    }

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
    this.myAddEventListener(window, 'searchcomplete', this.onSearchcomplete)
  }

  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  set caption(caption) {
    const title = caption.trim() || this.default
    const previous = this.cite.innerText

    clearTimeout(this.resetTimeout)

    if (!this.resetTimeout && title === this.default) {
      this.resetTimeout = setTimeout(
        () => (this.caption = this.default),
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
