import { MyElement, html, css } from '../modules/element.js'
import { councilLogo } from '../modules/icons.js'
import { app } from '../modules/app.js'

import { LanguagePicker } from './rs-language-picker.js'

class Menu extends MyElement {
  static styles = css`
    button {
      padding: 0;
      margin: 0 var(--gap);
      color: inherit;
      cursor: pointer;
      background: none;
      border: none;
      transition:
        transform 250ms,
        color 250ms;
    }

    button:hover {
      color: var(--color-accent);
    }

    button.open {
      transform: rotate(90deg);
    }

    button svg {
      height: 25px;
      vertical-align: middle;
      fill: currentcolor;
      transition: transform 200ms ease;
    }

    article {
      --about-width: 28rem;

      position: fixed;
      top: var(--header-height);
      right: 0;
      box-sizing: border-box;
      width: 100%;
      max-width: var(--about-width);
      height: calc(100vh - var(--header-height));
      padding: var(--gap);
      overflow: scroll;
      font-size: 15px;
      font-weight: 400;
      background-color: rgba(var(--color-panel-components), 0.941);
      backdrop-filter: blur(14px);
      border-left: 1px solid var(--color-line);
      box-shadow: -5px 0 5px #1c191750;
      opacity: 0;
      transform: translateX(var(--about-width));
    }

    article[ready] {
      transition: 350ms;
    }

    article.open {
      opacity: 1;
      transform: translateX(0);
    }

    @media (width <= 640px) {
      article {
        --about-width: 100%;
      }
    }
  `

  static html = html`
    <button>
      <svg viewBox="0 0 16 16">
        <path
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        ></path>
      </svg>
    </button>
    <article>
      <slot></slot>
    </article>
  `

  hamburger
  article

  async onLanguagechange() {
    const url = `about.${app.language}.html`
    const response = await fetch(url)
    const html = await response.text()

    app.$menu.innerHTML = `
    ${councilLogo}
    ${html}
    `
  }

  connectedCallback() {
    this.hamburger = this.shadowRoot?.querySelector('button')
    this.article = this.shadowRoot?.querySelector('article')

    this.sounds = {
      open: new Audio('/assets/sounds/activate.mp3'),
      close: new Audio('/assets/sounds/deactivate.mp3'),
    }

    setTimeout(() => this.article.setAttribute('ready', true), 350)

    this.hamburger.addEventListener('click', () => (this.open = !this.open))

    document.addEventListener('click', (event) => {
      event.target !== this && (this.open = false)
    })

    document.addEventListener('keyup', (event) => {
      event.key === 'Escape' && (this.open = false)
    })

    customElements.define('rs-language-picker', LanguagePicker)

    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  get open() {
    return this.hamburger.classList.contains('open')
  }

  set open(value) {
    if (this.open === value) {
      return
    }

    const sound = value ? 'open' : 'close'

    if (this.sounds) {
      const audio = this.sounds[sound]
      audio.play()
    }

    this.hamburger.classList.toggle('open', value)
    this.article.classList.toggle('open', value)
  }
}

export { Menu }
