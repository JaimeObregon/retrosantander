import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class Dates extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    nav {
      text-align: center;
    }

    main {
      display: inline-flex;
      flex-direction: column;
      gap: var(--space-medium);
      margin: auto;
      font-variant-numeric: tabular-nums;

      a {
        margin: 0.125em 0.5em;
        color: var(--color-accent);
        text-decoration: none;
      }

      div {
        padding: var(--space-medium);
        padding: 0;
      }

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.5rem;

        > a {
          font-variant: small-caps;
        }

        > div {
          display: flex;
          flex-direction: column;

          > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 1.15rem;

            > div {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  `

  static html = html`<nav></nav>`

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('nav')

    if (!this.container) {
      return
    }

    const items = app.project.indices
      .filter(({ folder }) =>
        ['centuries', 'decades', 'years'].includes(folder),
      )
      .map(({ folder, id, name, count }) => {
        const { paths } = app.project
        const path = Object.keys(paths).find((key) => paths[key] === folder)

        return html`
          <li>
            <a href="/${path}/${id}"> ${name} </a>
            (${count})
          </li>
        `
      })
      .join('')

    this.container.innerHTML = html`<ol>
      ${items}
    </ol>`

    const centuries = app.project.indices.filter(
      ({ folder }) => folder === 'centuries',
    )

    const decades = app.project.indices.filter(
      ({ folder }) => folder === 'decades',
    )

    const years = app.project.indices.filter(({ folder }) => folder === 'years')

    this.container.innerHTML = html`
      <main>
        ${centuries
          .map(
            (century) => html`
              <div>
                <a href="/mendeak/${century.id}">Siglo ${century.name}</a>
                <div>
                  ${decades
                    .filter(
                      (decade) =>
                        Number(decade.id.substring(0, 2)) + 1 == century.id,
                    )
                    .map(
                      (decade) =>
                        html`<div>
                          <a href="/hamarkadak/${decade.id}"
                            >Década de ${decade.name}</a
                          >
                          <div>
                            ${years
                              .filter(
                                (year) =>
                                  year.id.substring(0, 3) ==
                                  decade.id.substring(0, 3),
                              )
                              .map(
                                (year) =>
                                  html`<a href="/urteak/${year.id}"
                                    >${year.name}</a
                                  >`,
                              )
                              .join(' · ')}
                          </div>
                        </div>`,
                    )
                    .join('')}
                </div>
              </div>
            `,
          )
          .join('')}
      </main>
    `
  }
}

if (!customElements.get('rs-dates')) {
  customElements.define('rs-dates', Dates)
}

export { Dates }
