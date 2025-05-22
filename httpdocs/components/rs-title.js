import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css } from '../modules/strings.js'

class Title extends MyElement {
  static styles = css`
    :host {
      flex-grow: 1;
      margin: 0 var(--space-medium);
      overflow: hidden;
    }

    cite {
      box-sizing: border-box;
      display: block;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: var(--font-mono);
      font-size: var(--type-small);
      font-style: normal;
      color: var(--color-accent);
      text-align: center;
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

  set caption(caption) {
    const text = caption.trim().length ? caption.trim() : this.default

    if (this.cite.innerText === text) {
      return
    }

    const duration = this.cite.innerText.length * this.speeds.deleting

    this.cite.style.width = '0ch'
    this.cite.style.transitionDuration = `${duration}ms`

    setTimeout(() => {
      const duration = text.length * this.speeds.typing
      this.cite.innerText = text
      this.cite.style.width = `${text.length}ch`
      this.cite.style.transitionDuration = `${duration}ms`
    }, duration)
  }
}

if (!customElements.get('rs-title')) {
  customElements.define('rs-title', Title)
}

export { Title }
