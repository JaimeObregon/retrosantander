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
          text-decoration: line-through;
        }

        p {
          margin: 0;
          font-size: var(--type-small);
          font-weight: normal;
        }
      }
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
        <br />
        <p>Enlace retirado por el Ayuntamiento de Santander.</p>
      </dd>
    </dl>
  `

  set data(data) {
    this.innerHTML = Object.entries(data.json.details)
      .map(([key, value]) => html`<span slot="${key}">${value}</span>`)
      .join('')
  }
}

if (!customElements.get('rs-panel-details')) {
  customElements.define('rs-panel-details', PanelDetails)
}

export { PanelDetails }
