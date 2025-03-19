import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'

class Title extends MyElement {
  static styles = css`
    :host {
      flex-grow: 1;
      margin: 0 var(--gap);
      overflow: hidden;
    }

    cite {
      box-sizing: border-box;
      display: block;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: '_';
      font-size: var(--type-large);
      font-style: normal;
      font-weight: 600;
      color: var(--color-accent);
      text-align: center;
      white-space: nowrap;
      transition: width linear;

      &.fixed {
        text-overflow: ellipsis;
      }
    }

    @media (width <= 1280px) {
      cite {
        margin: 0;
        text-align: left;
      }
    }

    @media (width <= 1024px) {
      cite {
        font-size: var(--type-medium);
      }
    }
  `

  static html = html`<cite></cite>`

  default

  cite

  speeds = {
    deleting: 5,
    typing: 30,
  }

  onLanguagechange() {
    this.default = i18n.get('title.default')
    this.caption = this.default
  }

  connectedCallback() {
    this.cite = this.shadowRoot?.querySelector('cite')

    i18n.push({
      'title.default': app.project.title,
    })

    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  get caption() {
    return this.cite.innerText.trim()
  }

  set caption(caption) {
    // TODO Revisar esto:
    if (!caption) {
      return
    }
    // END TODO

    const text = caption.trim().length ? caption.trim() : this.default

    if (this.cite.innerText === text) {
      return
    }

    const duration = this.cite.innerText.length * this.speeds.deleting

    this.cite.style.width = '0ch'
    this.cite.style.transitionDuration = `${duration}ms`
    this.cite.classList.remove('fixed')

    setTimeout(() => {
      const duration = text.length * this.speeds.typing
      this.cite.innerText = text
      this.cite.style.width = `${text.length}ch`
      this.cite.style.transitionDuration = `${duration}ms`
      setTimeout(() => this.cite.classList.add('fixed'), duration)
    }, duration)
  }
}

if (!customElements.get('rs-title')) {
  customElements.define('rs-title', Title)
}

export { Title }
