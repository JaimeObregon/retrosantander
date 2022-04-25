// @ts-ignore
import { MasonryInfiniteGrid } from 'https://cdn.skypack.dev/@egjs/infinitegrid'
import debounce from 'https://cdn.skypack.dev/debounce'
import { data } from './data.js'

const itemsPerPage = 30

const escape = (string) =>
  string.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag])
  )

class Grid {
  grid

  constructor(container) {
    this.grid = new MasonryInfiniteGrid(container)

    this.grid.setPlaceholder({
      // https://stackoverflow.com/a/9967193
      html: `
        <figure class="placeholder">
          <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" />
        </figure>`,
    })

    this.grid.on('requestAppend', debounce(this.append.bind(this), 350))

    this.grid.renderItems()
  }

  append(event) {
    const key = (event.groupKey ?? 0) + 1

    const query = document.querySelector('input').value
    const results = data.search(query)

    const start = (key - 1) * itemsPerPage
    const items = results.slice(start, start + itemsPerPage).map(
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

    if (!items.length) {
      return
    }

    event.wait()

    console.log(items.length, itemsPerPage, items.length === itemsPerPage)
    if (key > 1 && items.length === itemsPerPage) {
      this.grid.removePlaceholders(5, key)
      this.grid.appendPlaceholders(5, key)
    }

    setTimeout(() => {
      event.ready()
      this.grid.append(items, key)
    }, 150)
  }

  clear() {
    this.grid
      .getGroups()
      .forEach((group) => this.grid.removeGroupByKey(group.groupKey))
  }
}

export { Grid }
