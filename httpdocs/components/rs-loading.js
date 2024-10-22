import { MyElement, html, css } from '../modules/element.js'

class Loading extends MyElement {
  static styles = css`
    footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 0;
      height: 8px;
      background: var(--color-neutral-300);
      transition: width ease-in 100ms;
    }
  `

  static html = html`<footer></footer>`

  delay = 250

  footer

  connectedCallback() {
    this.footer = this.shadowRoot.querySelector('footer')
  }

  set progress(value) {
    this.footer.classList.remove('hidden')
    this.footer.style.width = `${100 * value}%`
    value === 1 && setTimeout(() => (this.progress = 0), this.delay)
  }
}

export { Loading }
