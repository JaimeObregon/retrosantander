import { MyElement, html, css } from '../modules/element.js'
import { councilLogo } from '../modules/icons.js'
import { app } from '../modules/app.js'

import { LanguagePicker } from './rs-language-picker.js'

class Menu extends MyElement {
  static styles = css`
    button {
      padding: 0;
      margin: 0 var(--gap);
      border: none;
      background: none;
      color: inherit;
      transition: transform 250ms, color 250ms;
      cursor: pointer;
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
      fill: currentColor;
      transition: transform 200ms ease;
    }

    article {
      --about-width: 28rem;
      position: fixed;
      width: 100%;
      max-width: var(--about-width);
      height: calc(100vh - var(--header-height));
      top: var(--header-height);
      right: 0;
      overflow: scroll;
      box-sizing: border-box;
      padding: var(--gap);
      border-left: 1px solid var(--color-line);
      box-shadow: -5px 0 5px #1c191750;
      background-color: rgba(var(--color-panel-components), 0.941);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      font-size: 15px;
      font-weight: 400;
      padding: var(--gap);
      transform: translateX(var(--about-width));
      opacity: 0;
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
    this.hamburger = this.shadowRoot.querySelector('button')
    this.article = this.shadowRoot.querySelector('article')

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
    const audio = this.sounds[sound]
    audio.play()

    this.hamburger.classList.toggle('open', value)
    this.article.classList.toggle('open', value)
  }
}

export { Menu }
