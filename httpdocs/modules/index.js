import { NotFound } from '../components/rs-404.js'
import { Collections } from '../components/rs-collections.js'
import { Gallery } from '../components/rs-gallery.js'
import { Grid } from '../components/rs-grid.js'
import { Help } from '../components/rs-help.js'
import { Image } from '../components/rs-image.js'
import { Loading } from '../components/rs-loading.js'
import { Logo } from '../components/rs-logo.js'
import { Menu } from '../components/rs-menu.js'
import { Panel } from '../components/rs-panel.js'
import { Search } from '../components/rs-search.js'
import { ThemeSwitcher } from '../components/rs-theme-switcher.js'
import { Title } from '../components/rs-title.js'
import { app } from './app.js'

const { location } = window

const route = location.href.replace(location.origin, '')

customElements.define('rs-logo', Logo)
customElements.define('rs-title', Title)
customElements.define('rs-search', Search)
customElements.define('rs-menu', Menu)
customElements.define('rs-grid', Grid)
customElements.define('rs-help', Help)
customElements.define('rs-gallery', Gallery)
customElements.define('rs-collections', Collections)
customElements.define('rs-theme-switcher', ThemeSwitcher)
customElements.define('rs-panel', Panel)
customElements.define('rs-image', Image)
customElements.define('rs-loading', Loading)
customElements.define('rs-404', NotFound)

// ! No muy convencido de esto…
await Promise.all([
  customElements.whenDefined('rs-grid'),
  customElements.whenDefined('rs-search'),
])

app.dispatch(route)

const event = new Event('languagechange')
window.dispatchEvent(event)

window.addEventListener('popstate', () => {
  const route = location.href.replace(location.origin, '')
  app.dispatch(route)
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

const production = [
  'retrogipuzkoa.com',
  'retrosantander.com',
  'guregipuzkoa.com',
  'guregipuzkoa.eus',
].includes(window.location.hostname)

const environment = production ? 'production' : 'development'

if (environment !== 'production') {
  const source = new EventSource('/esbuild')
  source.addEventListener('change', () => window.location.reload())
}
