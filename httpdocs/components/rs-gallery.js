import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

// Duración del fundido entre dos imágenes
const crossFadeDuration = 250

// Cada cuántos milisegundos comprobar si ha terminado de cargar la siguiente imagen
const frequency = 50

class Gallery extends MyElement {
  static styles = css`
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-size: cover;
      transition: opacity ${crossFadeDuration}ms;
    }

    nav {
      position: absolute;
      bottom: var(--space-small);
      left: 0;
      display: flex;
      justify-content: center;
      width: 100%;

      button {
        width: 1em;
        height: 1em;
        margin: 0 5px;
        cursor: pointer;
        background: none;
        border: 1px solid var(--color-backdrop);
        border-radius: 100%;
        transition: var(--delay-large) ease;

        :is(&:hover, &.active) {
          background: var(--color-accent);
          border-color: var(--color-line);
          transform: scale(125%);
          transition: var(--delay-small) ease;
        }
      }
    }
  `

  static html = html`
    <div id="back"></div>
    <div id="front"></div>
    <nav></nav>
  `

  delay = 50000
  gallery
  index
  front
  back
  nav

  async connectedCallback() {
    this.front = this.shadowRoot?.querySelector('div#front')
    this.back = this.shadowRoot?.querySelector('div#back')
    this.nav = this.shadowRoot?.querySelector('nav')

    const response = await fetch(app.project.galleries)
    const galleries = await response.json()

    const id = this.getAttribute('gallery')

    this.gallery = galleries.find((gallery) => gallery.id === id)

    this.nav.innerHTML = this.gallery.images
      .map(() => `<button></button>`)
      .join('')

    this.current = 0

    this.carouselInterval = setInterval(this.next.bind(this), this.delay)

    this.onKeydown = (event) => {
      if (event.key === 'ArrowLeft') {
        this.previous()
        event.preventDefault()
      } else if (event.key === 'ArrowRight') {
        this.next()
        event.preventDefault()
      }
    }

    this.onClick = (event) => {
      if (event.target.nodeName !== 'BUTTON') {
        return
      }

      const buttons = [...this.nav.querySelectorAll('button')]
      this.current = buttons.findIndex((button) => button === event.target)
    }

    this.myAddEventListener(document, 'keydown', this.onKeydown)
    this.myAddEventListener(this.nav, 'click', this.onClick)
  }

  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (this.carouselInterval) {
      clearInterval(this.carouselInterval)
    }

    if (this.imageReadyInterval) {
      clearInterval(this.imageReadyInterval)
    }
  }

  next() {
    this.current = this.index >= this.gallery.length - 1 ? 0 : this.index + 1
  }

  previous() {
    this.current = !this.index ? this.gallery.length - 1 : this.index - 1
  }

  set current(index) {
    const id = this.gallery.images[index]

    const img = document.createElement('img')
    const url = app.project.image(id)
    img.setAttribute('src', url)

    this.imageReadyInterval = setInterval(() => {
      if (!img.complete) {
        return
      }

      clearInterval(this.imageReadyInterval)

      this.front.style.backgroundImage = this.back.style.backgroundImage

      this.back.style.backgroundImage = `
        radial-gradient(transparent 25%, var(--color-backdrop) 95%),
        url(${url})`

      this.front.style.opacity = 0

      this.timeout = setTimeout(() => {
        this.front.style.backgroundImage = this.back.style.backgroundImage
        this.front.style.opacity = 1
      }, crossFadeDuration)
    }, frequency)

    app.title = 'caption'

    const buttons = this.nav.querySelectorAll('button')
    buttons.forEach((button, i) =>
      button.classList.toggle('active', i === index),
    )

    this.index = index
  }
}

if (!customElements.get('rs-gallery')) {
  customElements.define('rs-gallery', Gallery)
}

export { Gallery }
