import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class PanelDetails extends MyElement {
  static styles = css`
    dl {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1.5em auto;
      row-gap: var(--space-small);
      margin: 0;

      dd {
        grid-column-start: 2;
        align-items: center;
        margin: 0;
        text-overflow: ellipsis;
        font-size: var(--type-small);
        font-weight: 500;
        line-height: var(--line-height-condensed);

        a {
          color: var(--color-link);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `

  static html = html`
    <dl>
      <dt title="Descripción">
        <rs-icon name="chatBubbleBottomCenterText"></rs-icon>
      </dt>
      <dd>
        <slot name="caption"></slot>
      </dd>

      <dt>
        <rs-icon name="whatsapp"></rs-icon>
      </dt>
      <dd>
        <a id="whatsapp">Enviar por WhatsApp</a>
      </dd>

      <dt>
        <rs-icon name="arrowDownCircle"></rs-icon>
      </dt>
      <dd>
        <a download>Descargar imagen</a>
      </dd>
    </dl>
  `

  buildWhatsAppLink() {
    const { whatsapp } = app.project
    const message = whatsapp.message(window.location.href)
    const encodedMessage = encodeURIComponent(message)
    const url = whatsapp.url(encodedMessage)
    return url
  }

  set data(data) {
    const { details } = data.json

    this.innerHTML = html`<span slot="caption">${details.caption}</span>`

    const whatsapp = this.shadowRoot?.querySelector('a#whatsapp')
    const download = this.shadowRoot?.querySelector('a[download]')

    whatsapp?.setAttribute('href', this.buildWhatsAppLink())
    download?.setAttribute('href', app.project.image(details.id))
  }
}

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
