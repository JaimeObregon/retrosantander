import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class Folders extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    ol {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    a {
      color: var(--color-accent);
      text-decoration: none;
    }
  `

  static html = html`<ol></ol>`

  render() {
    this.container = this.shadowRoot?.querySelector('ol')

    if (!this.container) {
      return
    }

    app.title = ''

    this.container.innerHTML = app.project.indices
      .filter(({ folder }) => folder === 'folders')
      .map(
        ({ id, name, count }) => html`
          <li><a href="/albumak/${id}">${name}</a> (${count})</li>
        `,
      )
      .join('')
  }

  connectedCallback() {
    this.render()

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-folders')) {
  customElements.define('rs-folders', Folders)
}

export { Folders }
