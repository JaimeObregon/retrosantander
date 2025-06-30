import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { labels } from '../../modules/labels.js'
import { css, html } from '../../modules/strings.js'

class Labels extends MyElement {
  static styles = css``

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    const indices = await app.project.fetchIndices()

    const items = indices
      .filter(([folder]) => folder === 'labels')
      .map(
        ([folder, id, name]) => html`
          <a href="/ikusi/${folder}/${id}"> ${name} </a>
        `,
      )
      .join('')

    this.container.innerHTML = html`<ol>
      ${items}
    </ol>`
  }
}

if (!customElements.get('rs-labels')) {
  customElements.define('rs-labels', Labels)
}

export { Labels }
