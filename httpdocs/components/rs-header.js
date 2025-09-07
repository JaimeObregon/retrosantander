import '../components/rs-menu.js'
import '../components/rs-search.js'
import '../components/rs-title.js'
import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class Header extends MyElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      box-sizing: border-box;
      display: flex;
      gap: var(--header-actions-gap);
      align-items: center;
      width: 100%;
      height: var(--header-height);
      padding-inline: var(--space-medium);
      background-color: var(--color-panel);
      border-bottom: 1px solid var(--color-border);
      box-shadow: 0 5px 5px var(--color-box-shadow);

      /* Necesario para tener backdrop-filter tanto aquí como en <rs-menu>. */
      &::before {
        position: absolute;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        backdrop-filter: blur(var(--panel-blur));
      }
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
  }
}

if (!customElements.get('rs-header')) {
  customElements.define('rs-header', Header)
}

export { Header }
