import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'
import { app } from '../modules/app.js'

class Logo extends MyElement {
  static styles = css`
    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentcolor;
      fill-rule: evenodd;
    }
  `

  static html = html``

  connectedCallback() {
    const name = this.getAttribute('name')
    const html = app.project.logos[name]
    if (html && this.shadowRoot) {
      this.shadowRoot.innerHTML = html
    }
  }
}

export { Logo }
