// @ts-ignore
import debounce from 'https://cdn.skypack.dev/debounce'
import { data } from './data.js'
import { Grid } from './grid.js'
import { zoom } from './zoom.js'

const search = document.querySelector('input')
const status = document.querySelector('div')
const main = document.querySelector('main')
const details = status.querySelector('ul')
const cite = status.querySelector('cite')

search.setAttribute(
  'placeholder',
  `Filtra ${data.length} imágenes de Santander…`
)

const url = new URL(document.location.href)
search.value = url.searchParams.get('q')

const grid = new Grid(main)

main.addEventListener('mouseover', (event) => {
  if (!(event.target instanceof HTMLImageElement) || !event.target.dataset.id) {
    status.style.visibility = 'hidden'
    return
  }

  const id = event.target.dataset.id
  cite.innerText = data.find(id)?.title || ''

  const image = data.find(event.target.dataset.id)

  details.querySelector('#date span').innerHTML = image.date
  details.querySelector('#collection span').innerHTML = image.collection
  details.querySelector('#author span').innerHTML = image.author
  details.querySelector('#material span').innerHTML = image.material
  details.querySelector('#procedure span').innerHTML = image.procedure
  details.querySelector('#link span').innerHTML = `
    <a href="http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${image.id}" target="cdis">
      ${image.id}
    </a>`

  status.style.visibility = 'visible'
})

main.addEventListener('click', (event) => {
  if (
    !(event.target instanceof HTMLImageElement) ||
    event.target.parentElement.classList.contains('placeholder')
  ) {
    return
  }

  zoom.to({ element: event.target })
})

search.addEventListener(
  'input',
  debounce(() => {
    grid.clear()
    history.pushState(null, null, `/?q=${search.value}`)
  }, 350).bind(grid)
)

search.addEventListener('blur', () => {
  setTimeout(() => {
    search.focus()
  }, 0)
})

window.addEventListener('popstate', (event) => {
  // Stay dry
  // zoom out…
  grid.clear()
  const url = new URL(document.location.href)
  search.value = url.searchParams.get('q')
})
