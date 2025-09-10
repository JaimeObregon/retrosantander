import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class CloseButton extends MyElement {
  static styles = css`
    :host {
      display: inline-flex;
      width: var(--space-large);
      overflow: hidden;
      border-radius: 100%;
    }

    button {
      width: 100%;
      aspect-ratio: 1 / 1;
      padding: 0;
      color: var(--color-text-muted);
      cursor: pointer;
      background: transparent;
      border: none;
      transition: background var(--delay-medium);

      &:hover {
        color: var(--color-accent);
      }
    }

    svg {
      display: flex;
      width: 100%;
      margin: auto;
      fill: currentcolor;
      stroke: currentcolor;
      stroke-width: 2px;
      transition: color ease-in-out var(--delay-small);

      path {
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    }
  `

  static html = html`
    <button>
      <svg class="solid" viewBox="0 0 24 24">
        <path d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  `

  async connectedCallback() {}
}

if (!customElements.get('rs-close-button')) {
  customElements.define('rs-close-button', CloseButton)
}

export { CloseButton }
