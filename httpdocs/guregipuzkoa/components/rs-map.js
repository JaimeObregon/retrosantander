import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { i18n } from '../../modules/i18n.js'
import { css } from '../../modules/strings.js'

class Map extends MyElement {
  static styles = css`
    svg {
      display: block;
      width: 100vw;
      height: calc(100vh - var(--header-height));
      min-height: 45vmax;
      background: var(--color-map-sea);

      path {
        fill: var(--color-map-land);
        stroke: var(--color-map-lines);
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: fill var(--delay-x-large);
      }

      a {
        path {
          fill: var(--color-map-place);
          stroke-width: 2;
        }

        &:hover path {
          fill: var(--color-accent);
          transition: fill var(--delay-small);
        }
      }
    }
  `

  async connectedCallback() {
    const response = await fetch('map.html')
    const contents = await response.text()

    if (!this.shadowRoot) {
      return
    }

    this.shadowRoot.innerHTML = contents

    const svg = this.shadowRoot?.querySelector('svg')

    if (!svg) {
      return
    }

    this.onMouseover = (event) => {
      const link = event.target.closest('a[title]')
      if (!link) {
        return
      }

      app.title = link.getAttribute('title')
    }

    this.onMouseout = () => {
      app.title = ''
    }

    this.myAddEventListener(svg, 'mouseout', this.onMouseout)
    this.myAddEventListener(svg, 'mouseover', this.onMouseover)
  }
}

if (!customElements.get('rs-map')) {
  customElements.define('rs-map', Map)
}

export { Map }
