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

    svg.addEventListener('click', (event) => {
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
    })

    svg.addEventListener('mouseover', (event) => {
      if (
        !(event.target instanceof Element) ||
        event.target.nodeName !== 'path'
      ) {
        return
      }

      app.title = event.target.closest('g')?.dataset.title
    })

    svg.addEventListener('mouseout', () => {
      app.title = ''
    })
  }
}

if (!customElements.get('rs-map')) {
  customElements.define('rs-map', Map)
}

export { Map }
