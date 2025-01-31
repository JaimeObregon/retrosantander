import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

const delay = 250

class Throbber extends MyElement {
  static styles = css`
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 0;
      height: var(--space-small);
      background: var(--color-text);
      transition: width var(--ease-in-1) ${delay}ms;

      &.hidden {
        height: 0;
      }
    }
  `

  static html = html`<footer></footer>`

  footer

  connectedCallback() {
    this.footer = this.shadowRoot?.querySelector('footer')
  }

  set progress(value) {
    this.footer.style.width = `${100 * value}%`
    this.footer.classList.toggle('hidden', value === 0)

    if (value === 1) {
      setTimeout(() => (this.progress = 0), delay)
    }
  }
}

export { Throbber }
