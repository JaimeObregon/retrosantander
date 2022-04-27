import { Database } from './database.js'
import { Grid } from './grid.js'

const response = await fetch('/retrosantander.json')
const json = await response.json()
const data = new Database(json)

const search = document.querySelector('input')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const status = document.querySelector('div')
const cite = status.querySelector('cite')
const details = status.querySelector('ul')

const debounce = (callback, wait) => {
  let timeout
  return (...args) => {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => callback.apply(context, args), wait)
  }
}

const state = {
  get query() {
    return search.value.trim()
  },

  set query(value) {
    search.value = value
  },

  set details(image) {
    if (!image) {
      status.style.visibility = 'hidden'
      return
    }

    cite.innerText = image.title
    details.querySelector('#date span').innerHTML = image.date
    details.querySelector('#collection span').innerHTML = image.collection
    details.querySelector('#author span').innerHTML = image.author
    details.querySelector('#material span').innerHTML = image.material
    details.querySelector('#procedure span').innerHTML = image.procedure
    details.querySelector('#link span').innerHTML = `
      <a href="http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${image.file}" target="cdis">
        ${image.id}
      </a>`

    status.style.visibility = 'visible'
  },

  get images() {
    return data.search(this.query)
  },
}

const grid = new Grid(main, footer)

const onInput = () => {
  grid.clear()
  grid.grid.renderItems()
  state.details = false
  history.pushState(null, null, state.query ? `/?q=${state.query}` : '/')
}

const onPopState = () => {
  const url = new URL(document.location.href)
  state.query = url.searchParams.get('q')
}

window.addEventListener('popstate', onPopState)

main.addEventListener('mouseover', (event) => {
  if (event.target instanceof HTMLImageElement) {
    state.details = data.find(event.target.dataset.id)
  }
})

main.addEventListener('click', (event) => {
  if (event.target instanceof HTMLImageElement) {
    grid.zoom({ element: event.target })
  }
})

search.addEventListener('input', debounce(onInput, 350).bind(grid))

search.setAttribute(
  'placeholder',
  search.dataset.placeholder.replace('%', data.length.toLocaleString())
)

document.addEventListener('keydown', () => search.focus())

document.addEventListener('keyup', (event) => {
  event.key === 'Escape' && grid.restore()
})

onPopState()

export { state, debounce }
