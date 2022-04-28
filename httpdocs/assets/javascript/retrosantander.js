// @ts-ignore
import dialogPolyfill from 'https://cdn.skypack.dev/dialog-polyfill'
import { Database } from './database.js'
import { Grid } from './grid.js'

const response = await fetch('/retrosantander.json')
const json = await response.json()
const data = new Database(json)

const header = document.querySelector('header')
const main = document.querySelector('main')
const aside = document.querySelector('aside')
const dialog = document.querySelector('dialog')
const footer = document.querySelector('footer')
const button = header.querySelector('button')
const search = header.querySelector('input')
const status = header.querySelector('div')
const cite = status.querySelector('cite')
const details = status.querySelector('ul')

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
    const results = data.search(this.query)
    aside.innerHTML = aside.innerHTML.replace('%%QUERY%%', escape(this.query))
    aside.style.display = results.length ? 'none' : 'block'
    return results
  },
}

const grid = new Grid(main, footer)

const onInput = () => {
  grid.clear()
  grid.grid.renderItems()
  state.details = false
  history.pushState(null, null, state.query ? `/?q=${state.query}` : '/')
}

window.addEventListener('popstate', () => {
  const url = new URL(document.location.href)
  state.query = url.searchParams.get('q')
})

window.addEventListener('resize', () => {
  document.body.style.marginTop = `calc(${header.offsetHeight}px + var(--gap))`
})

main.addEventListener('mouseover', (event) => {
  if (event.target instanceof HTMLImageElement) {
    state.details = data.find(event.target.dataset.id)
  }
})

main.addEventListener('click', (event) => {
  dialog.removeAttribute('open')
  if (event.target instanceof HTMLImageElement) {
    grid.zoom({ element: event.target })
  }
})

button.addEventListener('click', () => dialog.toggleAttribute('open'))

search.addEventListener('input', debounce(onInput, 350).bind(grid))

search.setAttribute(
  'placeholder',
  search.dataset.placeholder.replace('%', data.length.toLocaleString())
)

dialog.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement) {
    dialog.removeAttribute('open')
  }
})

document.addEventListener('keydown', () => search.focus())

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    if (dialog.hasAttribute('open')) {
      dialog.removeAttribute('open')
      return
    }
    grid.restore()
  }
})

window.dispatchEvent(new Event('popstate'))
window.dispatchEvent(new Event('resize'))

dialogPolyfill.registerDialog(dialog)

export { state, debounce, escape }
