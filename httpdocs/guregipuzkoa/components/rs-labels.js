import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
import { labels } from '../../modules/labels.js'
import { css, html } from '../../modules/strings.js'

class Labels extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    ol {
      padding: 0;
      margin: 0;
    }

    a {
      color: var(--color-accent);
      text-transform: lowercase;
      text-decoration: none;
    }
  `

  static html = html`<nav></nav>`

  render() {
    this.container = this.shadowRoot?.querySelector('nav')
    if (!this.container) {
      return
    }

    app.title = ''

    const language = i18n.getLanguage()

    const links = app.project.indices
      .filter(({ folder }) => folder === 'labels')
      .map(({ id, name }) => {
        const label = labels[name][language]
        return html` <a href="/etiketak/${id}">${label}</a> `
      })
      .join('')

    this.container.innerHTML = html`<ol>
      ${links}
    </ol>`
  }

  async connectedCallback() {
    this.render()

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-labels')) {
  customElements.define('rs-labels', Labels)
}

export { Labels }
