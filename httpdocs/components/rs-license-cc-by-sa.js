import { MyElement } from '../modules/element.js'
import { html } from '../modules/strings.js'

class LicenseCCBYSA extends MyElement {
  static html = `<slot></slot>`

  connectedCallback() {
    this.innerHTML = html`
      Con licencia
      <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
        ><abbr title="Creative Commons Attribution Share-Alike"
          >CC-BY-SA</abbr
        ></a
      >.
    `
  }
}

if (!customElements.get('rs-license-cc-by-sa')) {
  customElements.define('rs-license-cc-by-sa', LicenseCCBYSA)
}

export { LicenseCCBYSA }
