import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class Loading extends MyElement {
  static styles = css`
    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 0;
      height: var(--space-small);
      background: var(--color-text);
      transition: width var(--ease-in-1) var(--delay-small);
    }
  `

  static html = html`<footer></footer>`

  delay = 250

  footer

  connectedCallback() {
    this.footer = this.shadowRoot?.querySelector('footer')
  }

  set progress(value) {
    this.footer.classList.remove('hidden')
    this.footer.style.width = `${100 * value}%`
    value === 1 && setTimeout(() => (this.progress = 0), this.delay)
  }
}

export { Loading }
