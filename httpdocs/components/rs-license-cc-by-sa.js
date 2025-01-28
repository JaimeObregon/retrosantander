import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class LicenseCCBYSA extends MyElement {
  static styles = css`
    p {
      font-size: 16px;
    }

    p a {
      color: inherit;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-style: dotted;
    }

    p a:hover {
      text-decoration-style: solid;
    }
  `
  static html = html`
    <p>
      Con licencia
      <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
        >CC-BY-SA</a
      >.
    </p>
  `
}

export { LicenseCCBYSA }
