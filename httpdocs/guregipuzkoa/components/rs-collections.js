import '../../components/rs-close-button.js'
import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
import { css, html } from '../../modules/strings.js'

class Collections extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    main {
      position: relative;
      display: flex;
      align-items: flex-start;
      margin-inline: calc(-1 * var(--space-medium));

      section,
      nav,
      div {
        flex-shrink: 0;
        width: 50%;
      }

      section {
        position: sticky;
        top: calc(var(--header-height) + var(--space-large));
        box-sizing: border-box;
        padding-left: var(--space-medium);
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: var(--space-small);
        align-items: flex-end;
        font-size: var(--type-large);
        font-weight: bold;

        a {
          position: relative;
          padding: var(--space-small) var(--space-medium);
          line-height: var(--line-height-condensed);
          color: var(--color-accent);
          text-align: right;
          text-wrap: balance;
          text-decoration: none;

          &::before {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            content: '';
            background: inherit;
            transform: skewX(-15deg);
            transform-origin: 0 0;
          }

          &.active {
            color: var(--color-accent);
            background: var(--color-panel);
          }

          &:hover {
            color: var(--color-highlight-inverted);
            background: var(--color-accent);
          }
        }
      }

      div {
        position: sticky;
        top: 0;
        padding-right: var(--space-medium);
        font-weight: 400;

        article {
          box-sizing: border-box;
          height: calc(100vh - var(--header-height));
          padding: var(--space-x-large);
          overflow: scroll;
          background: var(--color-panel);

          &:empty {
            /*display: none;*/
          }

          :first-child {
            margin-top: 0;
          }

          :last-child {
            margin-bottom: 0;
          }

          a {
            color: inherit;
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-decoration-style: dotted;
          }
        }
      }
    }
  `

  static html = html`
    <main>
      <section>
        <slot></slot>
      </section>
      <nav></nav>
      <div>
        <article></article>
      </div>
    </main>
  `

  article
  nav
  collection

  async load() {
    if (!this.collection) {
      return
    }

    const language = i18n.getLanguage()

    const url = `collections/${this.collection}/${language}.html`
    const response = await fetch(url)
    const contents = await response.text()

    this.article.innerHTML = contents
  }

  async render() {
    this.container = this.shadowRoot?.querySelector('nav')
    if (!this.container) {
      return
    }

    app.title = ''

    const language = i18n.getLanguage()

    const url = `collections.${language}.html`

    const response = await fetch(url)
    const text = await response.text()

    this.innerHTML = text

    this.nav.innerHTML = app.project.collections
      .map(
        ({ id, title }) => html`
          <a class="${id === this.collection ? 'active' : ''}" href="/${id}"
            >${title[language]}</a
          >
        `,
      )
      .join('')

    this.load()
  }

  async connectedCallback() {
    this.nav = this.shadowRoot?.querySelector('nav')
    this.article = this.shadowRoot?.querySelector('article')

    this.render()

    this.onLanguagechange = () => this.render()

    this.onClick = async (event) => {
      if (event.target.nodeName !== 'A') {
        return
      }

      event.stopPropagation()
      event.preventDefault()

      const url = new URL(event.target.href)
      const slug = url.pathname.replace(/^\//, '')
      const collection = decodeURIComponent(slug)

      this.collection = collection

      this.load()

      this.nav
        .querySelectorAll('a')
        .forEach((a) => a.classList.toggle('active', a === event.target))

      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    }

    this.myAddEventListener(this.nav, 'click', this.onClick)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-collections')) {
  customElements.define('rs-collections', Collections)
}

export { Collections }
