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

      section,
      nav,
      article {
        flex-shrink: 0;
        width: 50%;
      }

      section {
        position: sticky;
        top: calc(var(--header-height) + var(--space-large));
      }

      nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: var(--type-large);
        font-weight: bold;

        a {
          position: relative;
          padding: var(--space-small) var(--space-medium);
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

      article {
        position: sticky;
        top: var(--header-height);
        box-sizing: border-box;
        height: calc(100vh - var(--header-height));
        padding: var(--space-x-large);
        overflow: scroll;
        font-weight: 400;
        background: var(--color-panel);

        a {
          color: inherit;
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-decoration-style: dotted;
        }

        img {
          width: 100%;
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
      <article></article>
    </main>
  `

  article
  nav

  async render() {
    this.container = this.shadowRoot?.querySelector('nav')
    if (!this.container) {
      return
    }

    app.title = ''

    const language = i18n.getLanguage()

    const url = `collections.${language}.html`

    const response = await fetch(url)
    const html = await response.text()

    this.innerHTML = html

    this.nav.innerHTML = app.project.collections
      .map(({ id, title }) => `<a href="/${id}">${title.es}</a>`)
      .join('')
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

      this.nav
        .querySelectorAll('a')
        .forEach((a) => a.classList.toggle('active', a === event.target))

      event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })

      const response = await fetch(`collections/${slug}/es.html`)
      const contents = await response.text()

      this.article.innerHTML = contents
    }

    this.myAddEventListener(this.nav, 'click', this.onClick)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-collections')) {
  customElements.define('rs-collections', Collections)
}

export { Collections }
