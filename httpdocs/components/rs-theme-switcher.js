import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

const mediaQuery = '(prefers-color-scheme: dark)'

const storageKey = 'theme'

class ThemeSwitcher extends MyElement {
  static styles = css`
    button {
      display: block;
      width: 100%;
      aspect-ratio: 1;
      padding: 0;
      touch-action: manipulation;
      cursor: pointer;
      outline-offset: 5px;
      background: none;
      border: none;
      border-radius: 50%;
      -webkit-tap-highlight-color: transparent;

      &:is(:hover, :focus-visible) svg {
        :is(mask#moon, circle#sun) {
          fill: var(--color-text);
        }

        g {
          stroke: var(--color-text);
        }
      }

      svg {
        width: 100%;
        height: 100%;
        stroke-linecap: round;

        :is(mask#moon, circle#sun, g) {
          transform-origin: center center;
        }

        :is(mask#moon, circle#sun) {
          fill: var(--color-text-pale);
        }

        circle#sun {
          transition: transform var(--delay-x-large) var(--ease-elastic-3);
        }

        mask#moon circle {
          transition: transform var(--delay-medium) var(--ease-out-5);
        }

        g {
          stroke: var(--color-text-pale);
          stroke-width: 2px;
          transition:
            transform var(--delay-x-large) var(--ease-elastic-4),
            opacity var(--delay-x-large) var(--ease-3);
        }
      }
    }

    :host([theme='dark']) svg {
      circle#sun {
        transform: scale(1.75);
      }

      g {
        opacity: 0;
        transform: rotate(-25deg);
        transition-duration: var(--delay-small);
      }

      mask#moon circle {
        transform: translate(-7px);
        transition-delay: var(--delay-medium);
        transition-duration: var(--delay-x-large);
      }

      /* stylelint-disable-next-line no-duplicate-selectors */
      circle#sun {
        transform: scale(1.75);
        transition-timing-function: var(--ease-3);
        transition-duration: var(--delay-medium);
      }
    }

    @supports (cx: 1) {
      button svg mask#moon circle {
        transition: cx var(--delay-medium) var(--ease-out-5);
      }

      :host([theme='dark']) svg mask#moon circle {
        transform: translate(0);
        cx: 17px;
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

    const stored = localStorage.getItem(storageKey)
    const system = window.matchMedia(mediaQuery).matches ? 'dark' : 'light'

    this.theme = stored === 'light' || stored === 'dark' ? stored : system

    this.onChangeMedia = (event) => {
      const dark = event.matches
      this.theme = dark ? 'dark' : 'light'
    }

    this.myAddEventListener(
      window.matchMedia(mediaQuery),
      'change',
      this.onChangeMedia,
    )
  }

  get theme() {
    return this.isDark ? 'dark' : 'light'
  }

  set theme(value) {
    localStorage.setItem(storageKey, value)

    document.documentElement.dataset.theme = value
    this.setAttribute('theme', value)
    this.isDark = value === 'dark'
  }

  connectedCallback() {
    this.onClick = (event) => {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      event.stopPropagation()
    }

    this.button = this.shadowRoot?.querySelector('button')

    this.myAddEventListener(this.button, 'click', this.onClick)
  }
}

if (!customElements.get('rs-theme-switcher')) {
  customElements.define('rs-theme-switcher', ThemeSwitcher)
}

export { ThemeSwitcher }
