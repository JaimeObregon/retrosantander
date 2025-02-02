import { NotFound } from '../components/rs-404.js'
import { Collections } from '../components/rs-collections.js'
import { Explorer } from '../components/rs-explorer.js'
import { Gallery } from '../components/rs-gallery.js'
import { Header } from '../components/rs-header.js'
import { Icon } from '../components/rs-icon.js'
import { app } from './app.js'

const folder = document.location.hostname.replace(/\.\w+$/, '')
const { project } = await import(`../${folder}/project.js`)
app.project = project

customElements.define('rs-404', NotFound)
customElements.define('rs-collections', Collections)
customElements.define('rs-gallery', Gallery)
customElements.define('rs-explorer', Explorer)
customElements.define('rs-header', Header)
customElements.define('rs-icon', Icon)

app.init()

window.addEventListener('popstate', () => {
  const { location } = window
  const route = location.href.replace(location.origin, '')
  app.dispatch(route)
})

window.addEventListener('languagechange', () => {
  document.documentElement.lang = app.language
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
