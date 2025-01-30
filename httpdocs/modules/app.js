import { database } from './database.js'
import { i18n } from './i18n.js'

const debounceDelay = 350

const app = {
  init() {
    this.$title = document.querySelector('rs-title')
    this.$search = document.querySelector('rs-search')
    this.$menu = document.querySelector('rs-menu')
    this.$grid = document.querySelector('rs-grid')
    this.$help = document.querySelector('rs-help')
    this.$main = document.querySelector('main')

    this.language = i18n.setLanguage()

    const { location } = window
    const route = location.href.replace(location.origin, '')
    app.dispatch(route)

    const languagechangeEvent = new Event('languagechange')
    window.dispatchEvent(languagechangeEvent)
  },

  get production() {
    return this.project.hosts.includes(window.location.hostname)
  },

  // Establece el título visible en la cabecera del sitio
  set title(caption) {
    this.$title.caption = caption
  },

  // Devuelve el término de búsqueda actual
  get query() {
    return this.$search.query ?? ''
  },

  // Consigna un término en el buscador
  set query(query) {
    this.$search.query = query
  },

  // Lanza una búsqueda del término existente en `this.query`
  search() {
    const { results, suggestions } = database.search(this.query)

    this.results = this.results ?? []

    this.$search.suggestions = suggestions

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (results.length && unchanged) {
      return
    }

    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      const url = new URL(document.location.href)
      if (app.query !== url.searchParams.get('q')) {
        history.pushState(null, '', app.query ? `/?q=${app.query}` : '/')
      }

      this.$grid = document.querySelector('rs-grid')

      this.$grid.restore()
      this.results.length ? this.$grid.appendItems() : this.$grid.clear()
      this.title = ''
      this.$help.hidden = Boolean(this.results.length)
    }, debounceDelay)
  },

  dispatch(route) {
    const rule = this.project.routes.find(({ pattern }) => route.match(pattern))

    if (rule) {
      const groups = route.match(rule.pattern).groups || {}
      if (rule.exec(this, groups) !== false) {
        return
      }
    }

    app.$main.innerHTML = '<rs-404></rs-404>'
  },
}

export { app }
