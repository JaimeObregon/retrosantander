import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'
import './rs-language-picker.js'
import './rs-theme-switcher.js'

class Menu extends MyElement {
  static styles = css`
    :host {
      flex-shrink: 0;
    }

    button {
      display: block;
      padding: 0;
      font-size: var(--type-medium);
      color: inherit;
      cursor: pointer;
      background: none;
      border: none;
      transition: var(--delay-medium);

      &:hover {
        color: var(--color-accent);
      }

      &.open {
        transform: rotate(90deg);
      }

      svg {
        height: var(--header-actions-size);
        vertical-align: middle;
        stroke: currentcolor;
        stroke-width: 3px;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }

    article {
      position: fixed;
      top: var(--header-height);
      right: 0;
      box-sizing: border-box;
      width: 100%;
      max-width: var(--menu-width);
      height: calc(100vh - var(--header-height));
      padding: var(--space-large);
      overflow: scroll;
      font-weight: 400;
      line-height: var(--line-height-condensed);
      background-color: var(--color-panel);
      border-left: 1px solid var(--color-border);
      box-shadow: -5px 0 5px var(--color-box-shadow);
      opacity: 0;
      transform: translateX(var(--menu-width));
      transition: var(--delay-large);

      /* Necesario para tener backdrop-filter tanto aquí como en <rs-header>. */
      &::before {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        backdrop-filter: blur(var(--panel-blur));
      }

      &.open {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (width <= 640px) {
      article {
        --menu-width: 100%;
      }
    }
  `

  static html = html`
    <button>
      <svg viewBox="0 0 24 24">
        <path d="M3.75 5.5 h16.5 M3.75 12 h16.5 m-16.5 6.5 h16.5" />
      </svg>
    </button>
    <article>
      <slot></slot>
    </article>
  `

  hamburger
  article

  connectedCallback() {
    this.hamburger = this.shadowRoot?.querySelector('button')
    this.article = this.shadowRoot?.querySelector('article')

    this.onHamburgerClick = () => (this.open = !this.open)

    this.onClick = (event) => {
      if (!this.contains(event.target)) {
        this.open = false
      }
    }

    this.onKeyup = (event) => {
      event.key === 'Escape' && (this.open = false)
    }

    this.onLanguagechange = async () => {
      const language = i18n.getLanguage()

      const url = `about.${language}.html`
      const response = await fetch(url)
      const html = await response.text()

      app.header.menu.innerHTML = html
    }

    this.myAddEventListener(this.hamburger, 'click', this.onHamburgerClick)
    this.myAddEventListener(document, 'click', this.onClick)
    this.myAddEventListener(document, 'keyup', this.onKeyup)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }

  get open() {
    return this.hamburger.classList.contains('open')
  }

  set open(value) {
    if (this.open === value) {
      return
    }

    this.hamburger.classList.toggle('open', value)
    this.article.classList.toggle('open', value)
  }
}

if (!customElements.get('rs-menu')) {
  customElements.define('rs-menu', Menu)
}

export { Menu }
