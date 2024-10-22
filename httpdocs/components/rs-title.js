import { MyElement, html, css } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { app } from '../modules/app.js'

class Title extends MyElement {
  static styles = css`
    :host {
      margin: 0 var(--gap);
    }

    cite {
      display: block;
      margin: 0 auto;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
      text-overflow: '_';
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      max-width: 100%;
      transition: width linear;
      color: var(--color-accent);
    }

    cite.static {
      text-overflow: ellipsis;
    }

    @media (max-width: 1536px) {
    }

    @media (max-width: 1280px) {
      cite {
        text-align: left;
        margin: 0;
      }
    }

    @media (max-width: 1024px) {
      cite {
        font-size: 18px;
      }
    }

    @media (max-width: 768px) {
      cite {
        font-size: 15px;
      }
    }
  `

  static html = html`<cite></cite>`

  default
  delay = { deleting: 5, typing: 30 }
  cite

  constructor() {
    super()

    i18n.push({
      'title.default': app.project.title,
    })
  }

  onLanguagechange() {
    this.default = i18n.get('title.default')

    this.caption = this.default
  }

  connectedCallback() {
    this.cite = this.shadowRoot.querySelector('cite')

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

    const duration = this.cite.innerText.length * this.delay.deleting

    this.cite.style.width = '0ch'
    this.cite.style.transitionDuration = `${duration}ms`
    this.cite.classList.remove('static')

    setTimeout(() => {
      const duration = text.length * this.delay.typing
      this.cite.innerText = text
      this.cite.style.width = `${text.length}ch`
      this.cite.style.transitionDuration = `${duration}ms`
      setTimeout(() => this.cite.classList.add('static'), duration)
    }, duration)
  }
}

export { Title }
