import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { html } from '../../modules/strings.js'

class Authors extends MyElement {
  static styles = ``

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    const indices = await app.project.fetchIndices()

    const items = indices
      .filter(([folder]) => ['users', 'photographers'].includes(folder))
      .map(
        ([folder, id, name, count]) => html`
          <li>
            <a href="/ikusi/${folder}/${id}"> ${folder} → ${name} </a>
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

if (!customElements.get('rs-authors')) {
  customElements.define('rs-authors', Authors)
}

export { Authors }
