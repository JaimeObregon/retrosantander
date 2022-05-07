import { database } from './database.js'
import '../components/rs-logo.js'
import '../components/rs-title.js'
import '../components/rs-search.js'
import '../components/rs-menu.js'
import '../components/rs-grid.js'
import '../components/rs-panel.js'
import '../components/rs-help.js'
import '../components/rs-loading.js'

await database.load('/data/retrosantander.json')

const help = document.querySelector('rs-help')
const grid = document.querySelector('rs-grid')
const title = document.querySelector('rs-title')
const panel = document.querySelector('rs-panel')
const search = document.querySelector('rs-search')
const loading = document.querySelector('rs-loading')

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

const app = {
  results: [],

  set title(caption) {
    title.caption = caption
  },

  get query() {
    return search.query
  },

  set query(query) {
    search.query = query
  },

  set loading(progress) {
    loading.progress = progress
  },

  set panel(contents) {
    panel.contents = contents
  },

  set activeLayer(id) {
    panel.activeLayer = id
    grid.activeLayer = id

    const selected = grid.selected.getAttribute('id')
    this.title = id ? grid.activeLayer : database.find(selected).title
  },

  get selected() {
    return grid.selected
  },

  search() {
    const { results, suggestions } = database.search(this.query)

    search.suggestions = suggestions
    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.refresh(), search.delay)
  },

  refresh() {
    const url = new URL(document.location.href)
    if (app.query !== url.searchParams.get('q')) {
      history.pushState(null, null, app.query ? `/?q=${app.query}` : '/')
    }

    grid.restore()
    help.hidden = Boolean(this.results.length)
    this.results.length ? grid.append() : grid.clear()
  },
}

app.title = ''
search.init()
grid.append()

export { app, database, escape }
