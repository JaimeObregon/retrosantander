// @ts-ignore
import { MasonryInfiniteGrid } from 'https://cdn.skypack.dev/@egjs/infinitegrid'
import { data } from './data.js'

const itemsPerPage = 30

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

    this.grid.on('requestAppend', (event) => {
      const key = (event.groupKey ?? 0) + 1

      // event.wait()
      // event.currentTarget.appendPlaceholders(20, key)
      // event.ready()

      const query = document.querySelector('input').value
      const results = data.search(query)

      const start = (key - 1) * itemsPerPage
      const items = results.slice(start, start + 50).map(
        (result) => `
          <figure>
            <img
              src="https://portal.ayto-santander.es/portalcdis/image/DownloadFileExposicion.do?id=${result.id}"
              data-id="${result.id}"
              alt="${result.details['Título']}"
            />
          </figure>`
      )

      if (items.length) {
        this.grid.append(items, key)
      }
    })

    this.grid.renderItems()
  }

  clear() {
    this.grid
      .getGroups()
      .forEach((group) => this.grid.removeGroupByKey(group.groupKey))
  }
}

export { Grid }
