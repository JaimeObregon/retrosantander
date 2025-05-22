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
      <dt title="Descripción">
        <rs-icon name="chatBubbleBottomCenterText"></rs-icon>
      </dt>
      <dd>
        <slot name="caption"></slot>
      </dd>
      <dt title="Referencia">
        <rs-icon name="arrowTopRightOnSquare"></rs-icon>
      </dt>
      <dd id="link">
        <a>Ver #<slot name="id"></slot> en Gure Gipuzkoa</a>
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

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
