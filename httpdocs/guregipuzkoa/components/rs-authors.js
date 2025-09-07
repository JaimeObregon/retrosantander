import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'
import { i18n } from '../../modules/i18n.js'

class Authors extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    ol {
      padding: 0;
      margin: 0;
      list-style: none;

      a {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  `

  static html = `<ol></ol>`

  render() {
    this.container = this.shadowRoot?.querySelector('ol')
    if (!this.container) {
      return
    }

    app.title = ''

    this.container.innerHTML = app.project.indices
      .filter(({ folder }) => ['users', 'photographers'].includes(folder))
      .map(({ folder, id, name, count }) => {
        const { paths } = app.project
        const path = Object.keys(paths).find((key) => paths[key] === folder)

        const label = i18n.get(`authors.${folder}`)

        return html`
          <li><a href="/${path}/${id}">${label} → ${name}</a> (${count})</li>
        `
      })
      .join('')
  }

  connectedCallback() {
    i18n.push({
      'authors.photographers': {
        es: 'Fotógrafos',
        eu: 'Argazkilariak',
        en: 'Photographers',
        fr: 'Photographes',
      },
      'authors.users': {
        es: 'Usuarios',
        eu: 'Erabiltzaileak',
        en: 'Users',
        fr: 'Utilisateurs',
      },
    })

    this.render()

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-authors')) {
  customElements.define('rs-authors', Authors)
}

export { Authors }
