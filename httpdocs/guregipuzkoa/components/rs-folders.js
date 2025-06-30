import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { html } from '../../modules/strings.js'

class Folders extends MyElement {
  static styles = ``

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    const indices = await app.project.fetchIndices()

    const items = indices
      .filter(([folder]) => folder === 'folders')
      .map(
        ([folder, id, name, count]) => html`
          <li>
            <a href="/ikusi/${folder}/${id}">/${name} </a>
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

if (!customElements.get('rs-folders')) {
  customElements.define('rs-folders', Folders)
}

export { Folders }
