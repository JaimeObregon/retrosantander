import { app } from '../modules/app.js'
import { database } from '../modules/database.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'
import './rs-image.js'
import './rs-notice.js'
import './rs-panel.js'
import './rs-throbber.js'

class Explorer extends MyElement {
  static styles = css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - var(--header-height));

      --columns: 4;
    }

    main {
      position: relative;
      flex-grow: 1;
      width: 100%;
      margin: var(--image-gap) 0;
      transition: transform var(--delay-x-large) ease;

      &:empty {
        /* Para que <rs-notice> aparezca verticalmente centrado */
        flex-grow: 0;
      }

      rs-image {
        position: absolute;
        display: block;
        width: calc(100% / var(--columns));
        transition: opacity ease-out var(--delay-small);

        &.hidden {
          pointer-events: none;
          opacity: 0;
        }
      }
    }

    hr {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      border: none;
    }

    @media (width <= 1280px) {
      :host {
        --columns: 3;
      }
    }

    @media (width <= 768px) {
      :host {
        --columns: 2;
      }
    }

    @media (width <= 640px) {
      :host {
        --columns: 1;
      }
    }
  `

  static html = html`
    <rs-panel></rs-panel>
    <rs-throbber></rs-throbber>
    <slot></slot>
    <main></main>
    <hr />
  `

  container
  pending = 0
  ready = false
  itemsPerPage = 25
  frequency = 150
  page = 0
  scale = 1
  padding

  resetTitle() {
    const language = i18n.getLanguage()

    const folder = this.getAttribute('folder')
    const id = this.getAttribute('id')

    if (app.query) {
      app.title = app.project.titles.search(app.query)[language]
    } else if (folder && id) {
      const { title } = app.project.indices.find(
        (index) => index.folder === folder && index.id === id,
      )

      app.title = title[language]
    } else {
      app.title = ''
    }
  }

  async connectedCallback() {
    this.container = this.shadowRoot?.querySelector('main')
    this.throbber = this.shadowRoot?.querySelector('rs-throbber')
    this.panel = this.shadowRoot?.querySelector('rs-panel')
    this.hr = this.shadowRoot?.querySelector('hr')

    if (!this.hr) {
      return
    }

    const folder = this.getAttribute('folder')
    const id = this.getAttribute('id')

    const index = app.project.index(folder, id)

    try {
      await database.load(index)
    } catch (error) {
      this.outerHTML = '<rs-404></rs-404>'
      return
    }

    this.innerHTML = html`<rs-notice class="hidden"></rs-notice>`

    const url = new URL(document.location.href)
    app.query = url.searchParams.get('q')

    this.resetTitle()

    this.observer = new IntersectionObserver(this.onIntersect.bind(this), {
      rootMargin: '0px',
      threshold: 0,
    })

    this.observer.observe(this.hr)

    this.onMouseover = (event) => {
      const id = event.target.getAttribute('id')
      if (id) {
        app.title = database.find(id).title
      }
    }

    this.onMouseout = () => this.resetTitle()

    this.onClick = async (event) => {
      const selected = this.container.querySelector('rs-image.selected')
      selected && (selected.areas = false)

      const image = event.target

      if (image.constructor.name !== 'Image') {
        return
      }

      this.zoom(image)

      if (selected) {
        return
      }

      image.classList.add('selected')

      const { areas, faces, objects, tags, exif, details } =
        await image.getMetadata()

      image.areas = areas

      // @ts-ignore
      this.panel.data = { faces, objects, tags, details, exif }
    }

    this.onKeyup = (event) => {
      event.key === 'Escape' && this.restore()
    }

    this.onResize = () => {
      this.arrange()
    }

    this.onSearchcomplete = (event) => {
      this.restore()
      this.results = event.detail.results
      this.results.length ? this.appendItems() : this.clear()
    }

    this.onLanguagechange = () => this.resetTitle()

    this.myAddEventListener(this.container, 'mouseover', this.onMouseover)
    this.myAddEventListener(this.container, 'mouseout', this.onMouseout)
    this.myAddEventListener(this.container, 'click', this.onClick)
    this.myAddEventListener(document, 'keyup', this.onKeyup)
    this.myAddEventListener(window, 'resize', this.onResize)
    this.myAddEventListener(window, 'searchcomplete', this.onSearchcomplete)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }

  disconnectedCallback() {
    if (this.interval) {
      clearTimeout(this.interval)
    }

    this.observer?.disconnect()
  }

  onIntersect(intersections) {
    const intersection = intersections[0]
    if (!this.ready || !intersection.isIntersecting || this.pending) {
      return
    }

    this.appendItems(++this.page)
  }

  appendItems(page = 0) {
    this.ready = false
    this.page = page

    if (!page) {
      this.clear()
    }

    const start = page * this.itemsPerPage
    const end = (1 + page) * this.itemsPerPage

    const images = this.results.slice(start, end).map((result) => result.id)

    if (!images.length) {
      return
    }

    this.container.innerHTML += images
      .map((id) => `<rs-image id="${id}" class="hidden"></rs-image>`)
      .join('')

    this.interval = setInterval(() => {
      this.pending = [...this.container.querySelectorAll('rs-image')].filter(
        (image) => !image.complete,
      ).length

      // @ts-ignore
      this.throbber.progress = 1 - this.pending / images.length

      if (!this.pending) {
        clearInterval(this.interval)
        this.arrange()
      }
    }, this.frequency)
  }

  arrange() {
    const div = document.createElement('div')
    div.setAttribute(
      'style',
      'width: var(--image-gap); height: var(--panel-width);',
    )

    document.body.appendChild(div)
    const { width: gap, height: detailsWidth } = div.getBoundingClientRect()
    document.body.removeChild(div)

    const header = document.querySelector('rs-header')

    if (!header) {
      return
    }

    const headerHeight = header.getBoundingClientRect().height

    const top = headerHeight + gap
    const left = detailsWidth + gap
    const right = gap
    const bottom = gap

    this.padding = { top, right, bottom, left }

    const images = [...this.container.querySelectorAll('rs-image')]

    if (!images.length) {
      return
    }

    images.forEach((image) => {
      delete image.dataset.top
      image.style = ''
    })

    const columns = Math.round(
      this.container.offsetWidth / images[0].offsetWidth,
    )

    if (!columns) {
      return
    }

    if (this.columns !== columns) {
      images.forEach((image) => delete image.dataset.column)
    }

    this.columns = columns

    const width = (this.container.offsetWidth - gap * (columns - 1)) / columns

    images
      .filter((image) => !image.dataset.top)
      .forEach((image, i) => {
        const heights = images
          .filter((image) => image.dataset.top)
          .reduce((array, current) => {
            array[current.dataset.column] = Math.max(
              array[current.dataset.column],
              Number(current.dataset.top) + current.offsetHeight + gap,
            )
            return array
          }, Array(columns).fill(0))

        const shortestColumn = heights.indexOf(Math.min(...heights))
        const column =
          image.dataset.column ?? (i < columns ? i % columns : shortestColumn)

        const top = heights[column]
        const left = column * (gap + width)

        const height = image.offsetHeight

        image.dataset.column = column
        image.dataset.top = top

        image.style.top = `${top}px`
        image.style.left = `${left}px`
        image.style.width = `${width}px`
        image.style.height = `${height}px`

        image.classList.remove('hidden')
      })

    const offset = this.container.getBoundingClientRect().top
    const bottommost = images
      .map((image) => image.getBoundingClientRect().bottom - offset)
      .reduce((max, current) => (max = Math.max(max, current)), 0)

    this.container.style.height = `${bottommost}px`

    if (!this.hr) {
      return
    }

    this.hr.style.top = `${bottommost}px`

    this.ready = true
  }

  clear() {
    this.container.innerHTML = ''
    this.container.style.height = 0

    // @ts-ignore
    this.throbber.progress = 0

    clearInterval(this.interval)

    if (!this.hr) {
      return
    }

    this.hr.style.top = ''
  }

  magnify(area = { width: 1, height: 1 }, scale) {
    const padding = this.padding

    const centerX =
      (window.innerWidth - padding.left - padding.right) / 2 + padding.left
    const centerY =
      (window.innerHeight - padding.top - padding.bottom) / 2 + padding.top

    const x = centerX - (area.x + area.width / 2)
    const y = centerY - (area.y + area.height / 2)

    const containerBounds = this.container.getBoundingClientRect()

    const originX = area.x - containerBounds.x + area.width / 2
    const originY = area.y - containerBounds.y + area.height / 2

    this.container.style.transformOrigin = `${originX}px ${originY}px`
    this.container.style.transform = `translate(${x}px, ${y}px) scale(${scale})`

    this.scale = scale
  }

  zoom(element) {
    if (this.selected) {
      this.restore()
      return
    }

    const bounds = element.getBoundingClientRect()
    const { innerWidth, innerHeight } = window

    const padding = this.padding
    const viewportWidth = innerWidth - padding.left - padding.right
    const viewportHeight = innerHeight - padding.top - padding.bottom

    const width = bounds.width
    const height = bounds.height

    const scale = Math.max(
      Math.min(viewportWidth / width, viewportHeight / height),
      1,
    )

    const x = bounds.left
    const y = bounds.top

    const area = { element, x, y, width, height }
    this.magnify(area, scale)
  }

  restore() {
    this.container.style.transform = ''
    this.scale = 1

    // @ts-ignore
    this.panel.data = false
    ;[...this.container.querySelectorAll('rs-image')].forEach((image) => {
      image.classList.remove('selected')
      image.areas = false
    })
  }

  get selected() {
    return this.container.querySelector('rs-image.selected')
  }

  get activeLayer() {
    const image = this.container.querySelector('rs-image.selected')
    return image.activeLayer
  }

  // Destaca un objeto de la visión artificial, cuando hay una imagen seleccionada.
  set activeLayer(layer) {
    const image = this.container.querySelector('rs-image.selected')

    if (!image) {
      return
    }

    image.activeLayer = layer

    // @ts-ignore
    this.panel.activeLayer = layer

    const id = this.selected.getAttribute('id')
    app.title = layer ? this.activeLayer : database.find(id).title
  }
}

if (!customElements.get('rs-explorer')) {
  customElements.define('rs-explorer', Explorer)
}

export { Explorer }
