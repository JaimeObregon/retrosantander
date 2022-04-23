import { MasonryInfiniteGrid } from 'https://cdn.skypack.dev/@egjs/infinitegrid'
import { zoom } from './zoom.js'

const response = await fetch('/retrosantander.json')
const db = await response.json()

function getItems(nextGroupKey, count) {
  const nextItems = []

  const regexp = new RegExp(document.querySelector('input').value, 'i')
  const results = db
    .reverse()
    .filter((resource) => resource.details['Título'].match(regexp))

  const z = results.map((o) => o.id)

  for (let i = 0; i < 50; ++i) {
    const num = nextGroupKey * count + i
    if (!z[num]) {
      continue
    }

    const url = `https://portal.ayto-santander.es/portalcdis/image/DownloadFileExposicion.do?id=${z[num]}`

    nextItems.push(`
      <figure>
        <img src="${url}" alt="egjs" data-id="${z[num]}" />
      </figure>`)
  }

  return nextItems
}

let grid
const reset = () => {
  grid = new MasonryInfiniteGrid('main', {
    gap: 0,
  })

  grid.setPlaceholder({
    html: `<figure class="placeholder"></figure>`,
  })

  grid.on('requestAppend', (e) => {
    const nextGroupKey = +(e.groupKey || 0) + 1
    e.wait()
    e.currentTarget.appendPlaceholders(5, nextGroupKey)

    setTimeout(() => {
      e.ready()
      grid.append(getItems(nextGroupKey, 50), nextGroupKey)
    }, 1)
  })
}

reset()

grid.renderItems()

document.addEventListener('click', (event) => {
  if (event.target.tagName !== 'IMG') {
    return
  }

  zoom.to({
    element: event.target,
  })
})

document.addEventListener('mouseover', (event) => {
  const id = event.target.dataset.id
  const p = db.find((l) => l.id === id)
  if (!p) {
    return
  }

  document.querySelector('aside span').innerText = p.details['Título']
})

document.querySelector('input').addEventListener('input', (event) => {
  grid
    .getItems()
    .map((e) => e.key)
    .forEach((i) => {
      grid.removeByKey(i)
    })

  grid.destroy()
  reset()

  // grid.removeGroupByKey(0)
  // grid.removeByKey(0)
  // grid.renderItems()
})
