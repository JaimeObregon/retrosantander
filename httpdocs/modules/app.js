import { i18n } from './i18n.js'

const app = {
  results: [],

  init() {
    this.header = document.querySelector('rs-header')
    this.main = document.querySelector('main')

    i18n.setLanguage()

    const { location } = window
    const route = location.href.replace(location.origin, '')
    app.dispatch(route)
  },

  get isProduction() {
    return this.project.hosts.includes(window.location.hostname)
  },

  // Establece el título visible en la cabecera del sitio.
  set title(caption) {
    this.header.title.caption = caption
  },

  // Devuelve el término de la búsqueda actual.
  get query() {
    return this.header.search.query
  },

  // Lanza una búsqueda.
  set query(query) {
    this.header.search.query = query
  },

  dispatch(route) {
    const rule = this.project.routes.find(({ pattern }) => route.match(pattern))

    if (rule) {
      const groups = route.match(rule.pattern).groups || {}
      if (rule.exec(this, groups) !== false) {
        return
      }
    }

    app.main.innerHTML = '<rs-404></rs-404>'
  },
}

export { app }
