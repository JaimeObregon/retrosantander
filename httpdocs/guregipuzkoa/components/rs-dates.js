import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class Dates extends MyElement {
  static styles = css``

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    const indices = await app.project.fetchIndices()

    const items = indices
      .filter(([folder]) => ['centuries', 'decades', 'years'].includes(folder))
      .map(
        ([folder, id, name, count]) => html`
          <li>
            <a href="/bildumak/${folder}/${id}"> ${name} </a>
            (${count})
          </li>
        `,
      )
      .join('')

    this.container.innerHTML = html`<ol>
      ${items}
    </ol>`
  }
}

if (!customElements.get('rs-dates')) {
  customElements.define('rs-dates', Dates)
}

export { Dates }
