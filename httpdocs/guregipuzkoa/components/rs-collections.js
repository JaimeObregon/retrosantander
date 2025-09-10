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
      article {
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

      article {
        position: sticky;
        top: var(--header-height);
        box-sizing: border-box;
        min-height: calc(100vh - var(--header-height));
        padding: var(--space-x-large);
        margin-block: calc(-1 * var(--space-medium));
        overflow: scroll;
        font-weight: 400;
        background: var(--color-panel);

        &:empty {
          display: none;
        }

        header {
          display: flex;
          gap: var(--space-medium);
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-large);

          a {
            display: flex;
            gap: var(--space-small);
            padding: var(--space-x-small) var(--space-small);
            font-size: var(--type-large);
            line-height: var(--line-height-condensed);
            color: inherit;
            text-wrap: balance;
            text-decoration: none;
            border: 1px solid currentcolor;
            border-radius: var(--space-small);

            &:hover {
              color: var(--color-highlight-inverted);
              background: var(--color-accent);
            }

            rs-icon {
              min-width: var(--space-medium);
            }
          }
        }

        :last-child {
          margin-bottom: 0;
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
  collection

  async load() {
    if (!this.collection) {
      return
    }

    const language = i18n.getLanguage()

    const url = `collections/${this.collection}/${language}.html`
    const response = await fetch(url)
    const contents = await response.text()

    const collection = app.project.collections.find(
      (collection) => collection.id === this.collection,
    )

    this.article.innerHTML = html`
      <header>
        <a href="/bildumak/${this.collection}">
          <rs-icon name="rectangleStack"></rs-icon>
          ${collection.title[language]}
          <rs-icon name="chevronRight"></rs-icon>
        </a>
        <rs-close-button></rs-close-button>
      </header>
      ${contents}
    `

    const button = this.article.querySelector('rs-close-button')

    this.myAddEventListener(button, 'click', () => {
      this.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
    })
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

    await this.load()

    this.nav.innerHTML = app.project.collections
      .map(
        ({ id, title }) => html`
          <a class="${id === this.collection ? 'active' : ''}" href="/${id}"
            >${title[language]}</a
          >
        `,
      )
      .join('')
  }

  async connectedCallback() {
    this.nav = this.shadowRoot?.querySelector('nav')
    this.article = this.shadowRoot?.querySelector('article')

    this.render()

    this.onLanguagechange = () => this.render()

    this.onClick = async (event) => {
      const a = event
        .composedPath()
        .find((element) => element instanceof HTMLAnchorElement)

      event.stopPropagation()
      event.preventDefault()

      const url = new URL(a.href)
      const slug = url.pathname.replace(/^\//, '')
      const collection = decodeURIComponent(slug)

      this.collection = collection

      await this.load()

      this.nav
        .querySelectorAll('a')
        .forEach((anchor) => a.classList.toggle('active', anchor === a))

      this.article.scrollIntoView({
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
