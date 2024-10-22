import { database } from './database.js'
import { i18n } from './i18n.js'

const app = {
  translations: {},

  debounceDelay: 350,

  results: [],

  // Establece el título visible en la cabecera de sitio.
  set title(caption) {
    this.$title.caption = caption
  },

  // Establece el título por defecto de la interfaz.
  set placeholder(caption) {
    this.$title.placeholder = caption
  },

  // Devuelve el término de búsqueda actual.
  get query() {
    return this.$search.query ?? ''
  },

  // Consigna un término en el buscador.
  set query(query) {
    this.$search.query = query
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

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
        history.pushState(null, null, app.query ? `/?q=${app.query}` : '/')
      }

      this.$grid = document.querySelector('rs-grid')

      this.$grid.restore()
      this.results.length ? this.$grid.appendItems() : this.$grid.clear()
      this.title = ''
      this.$help.hidden = Boolean(this.results.length)
    }, this.debounceDelay)
  },

  dispatch(route) {
    const rule = this.project.routes.find(({ pattern }) => route.match(pattern))

    const ruleExist = Boolean(rule)
    let ruleError

    if (ruleExist) {
      const groups = route.match(rule.pattern).groups || {}
      const result = rule.exec(this, groups)
      ruleError = result === false
    }

    if (!ruleExist || ruleError) {
      document.body.innerHTML += '<rs-404></rs-404>'
    }
  },
}

app.$title = document.querySelector('rs-title')
app.$search = document.querySelector('rs-search')
app.$menu = document.querySelector('rs-menu')
app.$grid = document.querySelector('rs-grid')
app.$help = document.querySelector('rs-help')

const { hostname } = document.location

const folder = hostname.replace(/\.\w+$/, '')

const { project } = await import(`../${folder}/project.js`)

app.project = project
app.language = i18n.setLanguage()

export { app }
