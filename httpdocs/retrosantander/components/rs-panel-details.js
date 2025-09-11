import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { css, html } from '../../modules/strings.js'

class PanelDetails extends MyElement {
  static styles = css`
    svg {
      width: 20px;
      vertical-align: middle;
      fill: none;
      stroke: currentcolor;
      stroke-width: 2px;
    }

    dl {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 25px auto;
      row-gap: var(--space-small);
      margin: 0;

      dd {
        display: flex;
        grid-column-start: 2;
        align-items: center;
        margin: 0;
        text-overflow: ellipsis;
      }

      dt svg path {
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      dt,
      dd {
        vertical-align: middle;
      }
    }

    abbr {
      cursor: help;
    }
  `

  static html = html`
    <dl>
      <dt title="Fecha">
        <rs-icon name="calendar"></rs-icon>
      </dt>
      <dd>
        <slot name="date"></slot>
      </dd>

      <dt title="Colección o fondo">
        <rs-icon name="documentDuplicate"></rs-icon>
      </dt>
      <dd>
        <slot name="collection"></slot>
      </dd>

      <dt title="Fotógrafo">
        <rs-icon name="camera"></rs-icon>
      </dt>
      <dd>
        <slot name="author"></slot>
      </dd>

      <dt title="Material">
        <rs-icon name="photo"></rs-icon>
      </dt>
      <dd>
        <slot name="material"></slot>
      </dd>

      <dt title="Procedimiento">
        <rs-icon name="beaker"></rs-icon>
      </dt>
      <dd>
        <slot name="procedure"></slot>
      </dd>

      <dt title="Referencia">
        <rs-icon name="arrowTopRightOnSquare"></rs-icon>
      </dt>
      <dd>
        <a>
          Ver <code>#<slot name="id"></slot></code> en el
          <abbr title="Centro de Documentación de la Imagen de Santander"
            >CDIS</abbr
          >
        </a>
      </dd>
    </dl>
  `

  set data(data) {
    const { details } = data

    const slots = Object.entries(details).map(
      ([key, value]) => html`<span slot="${key}">${value}</span>`,
    )

    this.innerHTML = slots.join('')

    const a = this.shadowRoot?.querySelector('a')
    const href = app.project.external(details.id)
    a?.setAttribute('href', href)
  }
}

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
