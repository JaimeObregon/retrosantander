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
      row-gap: calc(var(--gap) / 3);
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
        <rs-icon name="link"></rs-icon>
      </dt>
      <dd id="link">
        <a>
          Ver #<slot name="id"></slot> en el
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
      ([key, value]) => `<span slot="${key}">${value}</span>`,
    )

    this.innerHTML = slots.join('')

    const a = this.shadowRoot?.querySelector('a')
    const href = app.project.external(details.id)
    a?.setAttribute('href', href)
  }
}

export { PanelDetails }
