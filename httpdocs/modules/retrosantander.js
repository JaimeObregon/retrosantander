import { database } from './database.js'
import '../components/rs-logo.js'
import '../components/rs-title.js'
import '../components/rs-search.js'
import '../components/rs-menu.js'
import '../components/rs-grid.js'
import '../components/rs-panel.js'
import '../components/rs-help.js'
import '../components/rs-loading.js'

const debounceDelay = 350

const help = document.querySelector('rs-help')
const grid = document.querySelector('rs-grid')
const title = document.querySelector('rs-title')
const panel = document.querySelector('rs-panel')
const search = document.querySelector('rs-search')
const loading = document.querySelector('rs-loading')

// Escapa una cadena para interpolarla de manera segura en HTML
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

// Tokeniza una cadena. Véase https://es.stackoverflow.com/a/62032.
// `Manuel   González-Mesones` > `manuel gonzalez mesones`.
const normalize = (string) => {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1'
    )
    .normalize()
    .replace(/[^a-z0-9ñç ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const app = {
  results: [],

  // Establece el título visible en la cabecera de sitio.
  set title(caption) {
    title.caption = caption
  },

  // Establece el título por defecto de la interfaz.
  set placeholder(caption) {
    title.placeholder = caption
  },

  // Devuelve el término de búsqueda actual.
  get query() {
    return search.query
  },

  // Consigna un término en el buscador.
  set query(query) {
    search.query = query
  },

  // Muestra (`progress` > 0) u oculta (`progress` < 0) el indicador de carga.
  // `progress` es un valor entre cero y uno, ambos inclusive, que determina
  // el porcentaje de progreso.
  set loading(progress) {
    loading.progress = progress
  },

  // Abre o cierra, en función de `data`, el panel lateral con los datos de una imagen.
  set panel(data) {
    panel.data = data
  },

  // Devuelve la imagen seleccionada, si hay una.
  get selected() {
    return grid.selected
  },

  // Destaca un objeto de la visión artificial, cuando hay una imagen seleccionada.
  set activeLayer(layer) {
    panel.activeLayer = layer
    grid.activeLayer = layer

    const id = this.selected.getAttribute('id')
    this.title = layer ? grid.activeLayer : database.find(id).title
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

    search.suggestions = suggestions

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (unchanged) {
      return
    }

    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      const url = new URL(document.location.href)
      if (app.query !== url.searchParams.get('q')) {
        history.pushState(null, null, app.query ? `/?q=${app.query}` : '/')
      }

      this.restore()
      this.results.length ? grid.append() : grid.clear()
      this.title = ''
      help.hidden = Boolean(this.results.length)
    }, debounceDelay)
  },

  // Restaura el zoom, cierra el panel y deselecciona la imagen que pudiera haber seleccionada.
  restore() {
    grid.restore()
  },
}

await database.load('/data/retrosantander.json')

// Inicializa la aplicación.
const url = new URL(document.location.href)
const count = database.count.toLocaleString()
app.query = url.searchParams.get('q')
app.placeholder = `Explora ${count} imágenes históricas de Santander`
app.title = ''

export { app, database, escape, normalize }
