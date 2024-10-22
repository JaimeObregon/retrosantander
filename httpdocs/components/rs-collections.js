import { MyElement, html, css } from '../modules/element.js'
import { app } from '../modules/app.js'

class Collections extends MyElement {
  static styles = css`
    main {
      position: relative;
      top: calc(var(--header-height) + var(--gap));
      display: flex;
      height: calc(100vh - var(--header-height) - 2 * var(--gap));
      overflow: scroll;
    }

    main section,
    main nav,
    main article {
      flex-shrink: 0;
      width: 50%;
      overflow: scroll;
    }

    main section {
      box-sizing: border-box;
      padding-right: 3em;
      font-size: 19px;
      font-weight: 400;
    }

    main article {
      box-sizing: border-box;
      padding: 3em;
      font-size: 19px;
      font-weight: 400;
      background: var(--color-panel);
    }

    main article p {
      line-height: 1.5;
    }

    main article a {
      color: inherit;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-decoration-style: dotted;
    }

    main article img {
      width: 100%;
    }

    main nav {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 50%;
      font-size: 23px;
      font-weight: 600;
      text-align: right;
      padding: 0 0 calc(100vh - var(--header-height) - 2 * var(--gap) - 3em) 0;
    }

    main nav a {
      position: relative;
      text-decoration: none;
      background: var(--color-neutral-900);
      color: var(--color-link);
      padding: 1em 2em 1em 1em;
    }

    main nav a:before {
      content: '';
      transform-origin: 0 0;
      height: 100%;
      width: 100%;
      background: inherit;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transform: skewX(-15deg);
    }

    main nav a.active {
      background: var(--color-panel);
      color: var(--color-accent);
    }

    main nav a:hover {
      background: var(--color-accent);
      color: var(--color-highlight-inverted);
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

  connectedCallback() {
    this.nav = this.shadowRoot.querySelector('nav')
    this.article = this.shadowRoot.querySelector('article')

    this.nav.innerHTML = app.project.collections
      .map(
        (collection) => `
          <a href="/${collection.slug}">
            ${collection.title.es}
          </a>`
      )
      .join('')

    this.nav.addEventListener('click', async (event) => {
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
    })
  }
}

export { Collections }
