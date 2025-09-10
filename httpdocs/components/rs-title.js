import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, decode } from '../modules/strings.js'

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

  cite
  speeds = {
    deleting: 2,
    typing: 8,
  }

  connectedCallback() {
    this.cite = this.shadowRoot?.querySelector('cite')
  }

  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  set caption(caption) {
    const language = i18n.getLanguage()
    const title = caption.trim() || app.project.titles.default[language]
    const previous = this.cite.innerText

    if (title === previous) {
      return
    }

    const duration = previous.length * this.speeds.deleting

    this.cite.style.width = '0ch'
    this.cite.style.transitionDuration = `${duration}ms`

    this.timeout = setTimeout(() => {
      const duration = title.length * this.speeds.typing
      this.cite.innerText = decode(title)
      this.cite.style.width = `${title.length}ch`
      this.cite.style.transitionDuration = `${duration}ms`
    }, duration)
  }
}

if (!customElements.get('rs-title')) {
  customElements.define('rs-title', Title)
}

export { Title }
