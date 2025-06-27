import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { html, css, slugize } from '../../modules/strings.js'

class Map extends MyElement {
  static styles = css`
    svg {
      display: block;
      width: 100vw;
      height: calc(100vh - var(--header-height));
      min-height: 45vmax;
      background: var(--color-map-sea);

      g {
        path {
          fill: var(--color-map-land);
          stroke: var(--color-map-lines);
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: fill var(--delay-x-large);
        }

        &[data-title] {
          cursor: pointer;

          path {
            fill: var(--color-map-place);
            stroke-width: 2;
          }

          &:hover path {
            cursor: pointer;
            fill: var(--color-accent);
            transition: fill var(--delay-small);
          }
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

    this.onClick = (event) => {
      const isPath = event.target instanceof SVGPathElement
      if (!isPath) {
        return
      }

      const g = event.target.closest('g')

      if (!g.dataset.title) {
        return
      }

      const slug = slugize(g.dataset.title)
      const path = `/mapa/${slug}`

      const url = new URL(path, document.location.href)

      history.pushState(null, '', url.href)

      app.dispatch(path)
    }

    this.onMouseover = (event) => {
      const isPath = event.target instanceof SVGPathElement
      if (!isPath) {
        return
      }

      const g = event.target.closest('g')

      if (!g.dataset.title) {
        return
      }

      app.title = event.target.closest('g')?.dataset.title
    }

    this.onMouseout = () => {
      app.title = ''
    }

    this.myAddEventListener(svg, 'click', this.onClick)
    this.myAddEventListener(svg, 'mouseout', this.onMouseout)
    this.myAddEventListener(svg, 'mouseover', this.onMouseover)
  }
}

if (!customElements.get('rs-map')) {
  customElements.define('rs-map', Map)
}

export { Map }
