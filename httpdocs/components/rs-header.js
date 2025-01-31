import { Logo } from '../components/rs-logo.js'
import { Menu } from '../components/rs-menu.js'
import { Search } from '../components/rs-search.js'
import { Title } from '../components/rs-title.js'
import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class Header extends MyElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--header-height);
      background-color: var(--color-panel);
      backdrop-filter: blur(var(--panel-blur));
      border-bottom: 1px solid var(--color-line);
      box-shadow: 0 5px 5px var(--color-box-shadow);
    }
  `

  static html = html`<slot></slot>`

  title
  search
  menu

  connectedCallback() {
    this.title = this.querySelector('rs-title')
    this.search = this.querySelector('rs-search')
    this.menu = this.querySelector('rs-menu')

    customElements.define('rs-menu', Menu)
    customElements.define('rs-title', Title)
    customElements.define('rs-logo', Logo)
    customElements.define('rs-search', Search)
  }
}

export { Header }
