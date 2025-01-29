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
}

export { Header }
