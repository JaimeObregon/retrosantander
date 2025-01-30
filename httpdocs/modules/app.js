import { i18n } from './i18n.js'

const app = {
  results: [],

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

  get isProduction() {
    return this.project.hosts.includes(window.location.hostname)
  },

  // Establece el título visible en la cabecera del sitio.
  set title(caption) {
    this.$title.caption = caption
  },

  // Devuelve el término de la búsqueda actual.
  get query() {
    return this.$search.query
  },

  // Lanza una búsqueda.
  set query(query) {
    this.$search.query = query
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
