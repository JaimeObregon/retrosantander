// @ts-ignore
import { MasonryInfiniteGrid } from 'https://cdn.skypack.dev/@egjs/infinitegrid'
import { state, debounce, escape } from './retrosantander.js'

class Grid {
  grid
  container
  footer
  itemsPerPage = 30
  padding = 10
  scale = 1

  constructor(container, footer) {
    this.container = container
    this.footer = footer
    this.grid = new MasonryInfiniteGrid(container, { gap: 0 })
    this.grid.setPlaceholder({ html: '<div></div>' })
    this.grid.on('requestAppend', debounce(this.append.bind(this), 150))
    this.grid.renderItems()
  }

  append(event) {
    if (!state.images.length) {
      return
    }

    const key = event.groupKey ?? 0
    const start = key * this.itemsPerPage
    const items = state.images.slice(start, start + this.itemsPerPage).map(
      (result) => `
        <figure>
          <img
            src="https://portal.ayto-santander.es/portalcdis/image/DownloadFileExposicion.do?id=${
              result.id
            }"
            data-id="${result.id}"
            alt="${escape(result.title)}"
          />
        </figure>`
    )

    this.grid.append(items, key + 1)

    const interval = setInterval(() => {
      const images = [...this.container.querySelectorAll('img')]
      const pending = images.filter((img) => !img.complete)
      const percent = 100 - (100 * pending.length) / items.length

      this.footer.style.width = `${percent}%`
      this.footer.classList.toggle('visible', pending.length)

      if (!pending.length) {
        this.footer.style.width = 0
        clearInterval(interval)
      }
    }, 100)
  }

  clear() {
    this.grid
      .getGroups()
      .forEach((group) => this.grid.removeGroupByKey(group.groupKey))
  }

  magnify(area, scale) {
    area.x -= (window.innerWidth - (area.width || 1) * scale) / 2
    area.y -= (window.innerHeight - (area.height || 1) * scale) / 2

    if (scale === 1) {
      this.container.style.transform = ''
    } else {
      const [x, y] = [window.pageXOffset, window.pageYOffset]
      this.container.style.transformOrigin = `${x}px ${y}px`
      this.container.style.transform = `translate(${-area.x}px, ${-area.y}px) scale(${scale})`
    }

    this.container.classList.toggle('zoomed', scale > 1)
    this.scale = scale
  }

  zoom(options) {
    if (this.scale > 1) {
      this.restore()
      return
    }

    const bounds = options.element.getBoundingClientRect()
    options.width = bounds.width + this.padding * 2
    options.height = bounds.height + this.padding * 2

    const scale = Math.max(
      Math.min(
        window.innerWidth / options.width,
        window.innerHeight / options.height
      ),
      1
    )

    options.x = scale * (bounds.left - this.padding)
    options.y = scale * (bounds.top - this.padding)

    this.magnify(options, scale)
  }

  restore() {
    this.scale > 1 && this.magnify({ x: 0, y: 0 }, 1)
    this.scale = 1
  }
}

export { Grid }
