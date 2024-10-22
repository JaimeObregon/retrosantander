import { MyElement, html, css } from '../modules/element.js'
import { slugize } from '../modules/strings.js'
import { app } from '../modules/app.js'

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

export { Map }
