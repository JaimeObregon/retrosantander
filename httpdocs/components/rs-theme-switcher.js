import { MyElement, html, css } from '../modules/element.js'
import { app } from '../modules/app.js'

class ThemeSwitcher extends MyElement {
  // Ha de coincidir lo definido en el `<script>` en `index.html`
  storageKey = 'theme'

  // Ha de coincidir lo definido en el `<script>` en `index.html`
  mediaQueryString = '(prefers-color-scheme: dark)'

  static styles = css`
    button {
      background: none;
      border: none;
      padding: 0;
      display: block;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
      outline-offset: 5px;
    }

    button svg {
      width: 100%;
      height: 100%;
      stroke-linecap: round;
    }

    button svg :is(mask#moon, circle#sun, g) {
      transform-origin: center center;
    }

    button svg :is(mask#moon, circle#sun) {
      fill: var(--color-text-pale);
    }

    button svg g {
      stroke: var(--color-text-pale);
      stroke-width: 2px;
      transition: transform var(--delay-x-large) var(--ease-elastic-4),
        opacity var(--delay-x-large) var(--ease-3);
    }

    button:is(:hover, :focus-visible) svg :is(mask#moon, circle#sun) {
      fill: var(--color-text);
    }

    button:is(:hover, :focus-visible) svg g {
      stroke: var(--color-text);
    }

    :host([theme='dark']) svg circle#sun {
      transform: scale(1.75);
    }

    :host([theme='dark']) svg g {
      opacity: 0;
    }

    :host([theme='dark']) svg mask#moon circle {
      transform: translate(-7px);
    }

    button svg circle#sun {
      transition: transform var(--delay-x-large) var(--ease-elastic-3);
    }

    button svg mask#moon circle {
      transition: transform var(--delay-medium) var(--ease-out-5);
    }

    :host([theme='dark']) svg circle#sun {
      transition-timing-function: var(--ease-3);
      transition-duration: var(--delay-medium);
      transform: scale(1.75);
    }

    :host([theme='dark']) svg g {
      transition-duration: var(--delay-small);
      transform: rotate(-25deg);
    }

    :host([theme='dark']) svg mask#moon circle {
      transition-delay: var(--delay-medium);
      transition-duration: var(--delay-x-large);
    }

    @supports (cx: 1) {
      button svg mask#moon circle {
        transition: cx var(--delay-medium) var(--ease-out-5);
      }

      :host([theme='dark']) svg mask#moon circle {
        transform: translate(0);
        cx: 17;
      }
    }

    @media print {
      :host {
        display: none;
      }
    }
  `

  static html = html`
    <button>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <mask id="moon">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle id="sun" cx="12" cy="12" r="6" mask="url(#moon)" />
        <g>
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  `

  constructor() {
    super()

    const stored = localStorage.getItem(this.storageKey)
    const system = window.matchMedia(this.mediaQueryString).matches
      ? 'dark'
      : 'light'
    this.theme = stored ?? system

    this.changeMediaHandler = (event) => {
      const dark = event.matches
      this.theme = dark ? 'dark' : 'light'
    }

    window
      .matchMedia(this.mediaQueryString)
      .addEventListener('change', this.changeMediaHandler)
  }

  get theme() {
    return this.dark ? 'dark' : 'light'
  }

  set theme(value) {
    localStorage.setItem(this.storageKey, value)
    document.querySelector('html').dataset.theme = value
    this.setAttribute('theme', value)
    this.dark = value === 'dark'
  }

  clickHandler(event) {
    this.theme = this.theme === 'light' ? 'dark' : 'light'

    const audio = this.sounds[this.theme]
    audio.play()

    event.stopPropagation()
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button')

    this.sounds = {
      dark: new Audio('/assets/sounds/activate.mp3'),
      light: new Audio('/assets/sounds/deactivate.mp3'),
    }

    this.button.addEventListener('click', this.clickHandler.bind(this))
  }

  disconnectedCallback() {
    window
      .matchMedia(this.mediaQueryString)
      .removeEventListener('change', this.changeMediaHandler)
  }
}

export { ThemeSwitcher }
