import { link, annotation } from '../../modules/icons.js'
import { MyElement, html, css } from '../../modules/element.js'

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
    }

    dl dd {
      display: flex;
      grid-column-start: 2;
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
      <dt title="Descripción">${annotation}</dt>
      <dd><slot name="caption"></slot></dd>
      <dt title="Referencia">${link}</dt>
      <dd id="link">
        <a> Ver #<slot name="id"></slot> en Gure Gipuzkoa </a>
      </dd>
    </dl>
  `

  connectedCallback() {}

  set data(data) {
    const { details } = data

    const slots = Object.entries(details).map(
      ([key, value]) => `<span slot="${key}">${value}</span>`,
    )

    this.innerHTML = slots.join('')

    const a = this.shadowRoot?.querySelector('a')
    const url = `https://www.guregipuzkoa.eus/photo/${details.file}`
    a?.setAttribute('href', url)
  }
}

export { PanelDetails }
