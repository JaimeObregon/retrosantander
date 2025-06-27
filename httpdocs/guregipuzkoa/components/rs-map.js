import { app } from '../../modules/app.js'
import { MyElement } from '../../modules/element.js'
import { html, slugize } from '../../modules/strings.js'

class Map extends MyElement {
  static html = html`<slot></slot>`

  connectedCallback() {
    const svg = this.querySelector('svg')

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
