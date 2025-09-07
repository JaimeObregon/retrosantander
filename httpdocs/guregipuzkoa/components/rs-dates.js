import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
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
      gap: var(--space-large);
      margin: auto;
      font-variant-numeric: tabular-nums;

      a {
        margin: var(--space-xx-small) var(--space-x-small);
        color: var(--color-accent);
        text-decoration: none;
      }

      div {
        padding: var(--space-medium);
        padding: 0;
      }

      > div {
        display: flex;
        flex-direction: column;

        > a {
          font-size: var(--type-large);
          font-variant: small-caps;
        }

        > div {
          display: flex;
          flex-direction: column;

          > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: var(--type-small);

            > a {
              margin-right: var(--space-medium);
            }
          }
        }
      }
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

    const centuries = app.project.indices.filter(
      ({ folder }) => folder === 'centuries',
    )

    const decades = app.project.indices.filter(
      ({ folder }) => folder === 'decades',
    )

    const years = app.project.indices.filter(({ folder }) => folder === 'years')

    const { titles } = app.project

    this.container.innerHTML = html`
      <main>
        ${centuries
          .map(
            (century) => html`
              <div>
                <a href="/mendeak/${century.id}"
                  >${titles.centuries(century.name)[language]}</a
                >
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
                            >${titles.decades(decade.name)[language]}</a
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
                              .join(' • ')}
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

  async connectedCallback() {
    this.render()

    this.onLanguagechange = () => this.render()

    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }
}

if (!customElements.get('rs-dates')) {
  customElements.define('rs-dates', Dates)
}

export { Dates }
