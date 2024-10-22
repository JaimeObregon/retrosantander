import { MyElement, html, css } from '../modules/element.js'
import { app } from '../modules/app.js'
import { escape } from '../modules/strings.js'
import { database } from '../modules/database.js'

class Image extends MyElement {
  static styles = css`
    @keyframes pulsate {
      from {
        transform: scale(100%);
      }

      to {
        transform: scale(107.5%);
      }
    }

    figure {
      position: relative;
      margin: 0;
      font-size: 0;
    }

    figure img {
      width: 100%;
      cursor: pointer;
      border-radius: 4px;
    }

    figure div {
      position: absolute;
      cursor: pointer;
      border: 1px solid;
      border-radius: 3px;
      opacity: 0;
      transition: ease-out 350ms;
    }

    :host(.selected) figure:hover div,
    :host(.selected) figure.active div {
      opacity: 1;
    }

    figure div.active {
      transition: ease-out 150ms;
      animation: pulsate ease-in-out alternate infinite 1s;
    }

    figure div.face {
      border-color: var(--color-yellow-500);
      border-radius: 100%;
    }

    figure div.object {
      border-color: var(--color-accent);
    }

    figure div.face.active {
      background: #eab30870;
    }

    figure div.object.active {
      background: #dc262670;
    }
  `

  static html = html`
    <figure>
      <img loading="lazy" />
    </figure>
  `

  figure
  img
  id

  connectedCallback() {
    this.img = this.shadowRoot.querySelector('img')
    this.figure = this.shadowRoot.querySelector('figure')
    this.id = this.getAttribute('id')

    const details = database.find(this.id)
    const src = app.project.image(this.id)

    this.img.setAttribute('src', src)
    this.img.setAttribute('alt', escape(details.title))

    this.figure.addEventListener('mouseover', (event) => {
      const isDiv = event.target instanceof HTMLDivElement
      if (!isDiv) {
        return
      }

      app.$grid.activeLayer = event.target.dataset.id
    })

    this.figure.addEventListener('mouseout', (event) => {
      const isDiv = event.target instanceof HTMLDivElement
      if (isDiv) {
        app.$grid.activeLayer = false
      }
    })
  }

  set areas(areas) {
    this.figure.querySelectorAll('div').forEach((div) => div.remove())

    if (!areas) {
      return
    }

    this.figure.innerHTML += areas
      .sort((a, b) => (a.area < b.area ? 1 : -1))
      .map(
        (area) => `<div
          class="${area.type}"
          data-id="${area.id}"
          data-name="${area.id}"
          data-title="${area.title}"
          style="
            top: ${area.top}%;
            left: ${area.left}%;
            width: ${area.width}%;
            height: ${area.height}%
          "></div>`,
      )
      .join('')
  }

  get complete() {
    return this.shadowRoot.querySelector('img').complete
  }

  get activeLayer() {
    return this.figure.querySelector('div.active').dataset.title
  }

  set activeLayer(id) {
    this.figure.classList.toggle('active', id)
    const divs = [...this.figure.querySelectorAll('div')]
    divs.map((div) => div.classList.toggle('active', div.dataset.id === id))
  }
}

export { Image }
