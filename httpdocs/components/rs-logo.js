import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'
import { app } from '../modules/app.js'

class Logo extends MyElement {
  static styles = css`
    svg {
      display: block;
      width: auto;
      height: 100%;
      fill: currentcolor;
      fill-rule: evenodd;
    }
  `

  static html = html``

  connectedCallback() {
    const name = this.getAttribute('name')

    if (!name) {
      return
    }

    const html = app.project.logos[name]
    if (html && this.shadowRoot) {
      this.shadowRoot.innerHTML = html
    }
  }
}

if (!customElements.get('rs-logo')) {
  customElements.define('rs-logo', Logo)
}

export { Logo }
