import { app } from './app.js'
import { i18n } from './i18n.js'

const folder = document.location.hostname.replace(/\.\w+$/, '')
const { project } = await import(`../${folder}/project.js`)
app.project = project

await Promise.all([
  import('../components/rs-404.js'),
  import('../components/rs-collections.js'),
  import('../components/rs-explorer.js'),
  import('../components/rs-gallery.js'),
  import('../components/rs-header.js'),
  import('../components/rs-icon.js'),
  import('../components/rs-logo.js'),
])

app.init()

window.addEventListener('popstate', () => {
  const { location } = window
  const route = location.href.replace(location.origin, '')
  app.dispatch(route)
})

window.addEventListener('languagechange', () => {
  const language = i18n.getLanguage()
  document.documentElement.lang = language
})

document.addEventListener('click', (event) => {
  const link = event
    .composedPath()
    .find(
      (element) => element instanceof HTMLElement && element.nodeName === 'A',
    )

  if (!(link instanceof HTMLAnchorElement)) {
    return
  }

  if (!link?.href || event.metaKey || event.ctrlKey) {
    return
  }

  const current = new URL(window.location.href)
  const target = new URL(link.href)

  if (current.origin === target.origin) {
    if (
      current.pathname !== target.pathname ||
      current.search !== target.search
    ) {
      history.pushState(null, '', link.href)
    }

    const route = target.href.replace(current.origin, '')
    app.dispatch(route)

    event.preventDefault()
  }
})

if (!app.isProduction) {
  const source = new EventSource('/esbuild')
  source.addEventListener('change', () => window.location.reload())
}
