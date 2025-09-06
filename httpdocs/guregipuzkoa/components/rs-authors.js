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

    const items = app.project.indices
      .filter(({ folder }) => ['users', 'photographers'].includes(folder))
      .map(({ folder, id, name, count }) => {
        const { paths } = app.project
        const path = Object.keys(paths).find((key) => paths[key] === folder)

        return html`
          <li>
            <a href="/${path}/${id}">${folder} → ${name}</a>
            (${count})
          </li>
        `
      })
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
