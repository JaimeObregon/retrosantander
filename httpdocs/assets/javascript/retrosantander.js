import { data } from './data.js'
import { Grid } from './grid.js'
import { zoom } from './zoom.js'

const search = document.querySelector('input')
const main = document.querySelector('main')
const cite = document.querySelector('cite')
const details = document.querySelector('tr:nth-child(2)')

search.setAttribute(
  'placeholder',
  `Filtra ${data.length} imágenes de Santander…`
)

const url = new URL(document.location.href)
search.value = url.searchParams.get('q')

const grid = new Grid(main)

main.addEventListener('mouseover', (event) => {
  if (!(event.target instanceof HTMLImageElement)) {
    return
  }

  const id = event.target.dataset.id
  cite.innerText = data.find(id)?.details['Título'] || ''

  const image = data.find(event.target.dataset.id)

  details.innerHTML = `
    <td>${image.details['Fecha']}</td>
    <td>${image.details['Colección/Fondo']}</td>
    <td>${image.details['Fotógrafo']}</td>
    <td>${image.details['Soporte']}</td>
    <td>${image.details['Procedimiento']}</td>
    <td><a href="http://portal.ayto-santander.es/portalcdis/Public/FotoView.do?id=${image.id}" target="cdis">${image.id}</a></td>
    `
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

search.addEventListener('input', grid.clear.bind(grid))
