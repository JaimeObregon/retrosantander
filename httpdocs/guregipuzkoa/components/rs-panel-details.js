import {
  calendar,
  documentDuplicate,
  camera,
  photo,
  beaker,
  link,
} from '../../modules/icons.js'
import { MyElement, html, css } from '../../modules/element.js'

class PanelDetails extends MyElement {
  static styles = css`
    svg {
      width: 20px;
      vertical-align: middle;
      stroke: currentColor;
      stroke-width: 2px;
      fill: none;
    }

    dl {
      display: grid;
      grid-template-columns: 25px auto;
      grid-template-rows: auto;
      row-gap: calc(var(--gap) / 3);
      margin: 0;
    }

    dl dd {
      grid-column-start: 2;
      display: flex;
      align-items: center;
      margin: 0;
      text-overflow: ellipsis;
    }

    dl dt svg path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    dl dt,
    dl dd {
      vertical-align: middle;
    }

    abbr {
      cursor: help;
    }
  `

  static html = html`
    <dl>
      <dt title="Fecha">${calendar}</dt>
      <dd><slot name="date"></slot></dd>
      <dt title="Colección o fondo">${documentDuplicate}</dt>
      <dd><slot name="collection"></slot></dd>
      <dt title="Fotógrafo">${camera}</dt>
      <dd><slot name="author"></slot></dd>
      <dt title="Material">${photo}</dt>
      <dd><slot name="material"></slot></dd>
      <dt title="Procedimiento">${beaker}</dt>
      <dd><slot name="procedure"></slot></dd>
      <dt title="Referencia">${link}</dt>
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

  connectedCallback() {}

  set data(data) {
    const { details } = data

    this.innerHTML = Object.entries(details).map(
      ([key, value]) => `<span slot="${key}">${value}</span>`
    )

    const a = this.shadowRoot.querySelector('a')
    const url = `http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${details.id}`
    a.setAttribute('href', url)
  }
}

export { PanelDetails }
