import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { html, slugize } from '../modules/strings.js'

class Map extends MyElement {
  static html = html`<slot></slot>`

  connectedCallback() {
    const svg = this.querySelector('svg')

    if (!svg) {
      return
    }

    this.onClick = (event) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const location = event.target.closest('g')?.dataset.title
      if (!location) {
        return
      }

      const slug = slugize(location)
      const url = `/mapa/${slug}`

      history.pushState(null, '', url)
      app.dispatch(url)
    }

    this.onMouseover = (event) => {
      if (
        !(event.target instanceof Element) ||
        event.target.nodeName !== 'path'
      ) {
        return
      }

      app.title = event.target.closest('g')?.dataset.title
    }

    this.onMouseout = () => {
      app.title = ''
    }

    this.myAddEventListener(svg, 'click', this.onClick)
    this.myAddEventListener(svg, 'mouseover', this.onMouseover)
    this.myAddEventListener(svg, 'mouseout', this.onMouseout)
  }
}

if (!customElements.get('rs-map')) {
  customElements.define('rs-map', Map)
}

export { Map }
