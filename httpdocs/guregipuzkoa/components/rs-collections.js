import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
import { css, html } from '../../modules/strings.js'

class Collections extends MyElement {
  static styles = css`
    main {
      position: relative;
      top: calc(var(--header-height) + var(--image-gap));
      display: flex;
      height: calc(100vh - var(--header-height) - 2 * var(--image-gap));
      overflow: scroll;

      section,
      nav,
      article {
        flex-shrink: 0;
        width: 50%;
        overflow: scroll;
      }

      section {
        box-sizing: border-box;
        padding-right: 3em;
        font-size: 19px;
        font-weight: 400;
      }

      article {
        box-sizing: border-box;
        padding: 3em;
        font-size: 19px;
        font-weight: 400;
        background: var(--color-panel);

        p {
          line-height: 1.5;
        }

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

      nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 50%;
        padding: 0 0
          calc(100vh - var(--header-height) - 2 * var(--image-gap) - 3em);
        font-size: 23px;
        font-weight: 600;
        text-align: right;

        a {
          position: relative;
          padding: 1em 2em 1em 1em;
          /*color: var(--color-link);*/
          text-decoration: none;
          background: var(--color-neutral-900);

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

  async connectedCallback() {
    this.nav = this.shadowRoot?.querySelector('nav')
    this.article = this.shadowRoot?.querySelector('article')

    this.onLanguagechange = async () => {
      const language = i18n.getLanguage()

      const url = `collections.${language}.html`

      const response = await fetch(url)
      const html = await response.text()

      this.innerHTML = html

      this.nav.innerHTML = app.project.collections
        .map(
          (collection) => `
          <a href="/${collection.slug}">
            ${collection.title.es}
          </a>`,
        )
        .join('')
    }

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
