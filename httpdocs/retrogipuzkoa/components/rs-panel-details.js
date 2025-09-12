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
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-decoration-style: dotted;
          text-underline-offset: 2px;
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
    </dl>
  `

  set data(data) {
    const { details } = data

    this.innerHTML = Object.entries(details)
      .map(([key, value]) => html`<span slot="${key}">${value}</span>`)
      .join('')
  }
}

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
