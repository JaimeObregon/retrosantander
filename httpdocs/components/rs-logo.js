import { MyElement, html, css } from '../modules/element.js'

class Logo extends MyElement {
  static styles = css`
    a {
      display: block;
      line-height: var(--header-height);
      padding: 0 var(--gap);
      color: inherit;
    }

    a ::slotted(svg) {
      height: 40px;
      vertical-align: middle;
      transition: 200ms ease;
      fill: currentColor;
      fill-rule: evenodd;
    }

    a:hover ::slotted(svg) {
      transform: scale(1.035);
      color: white;
    }
  `

  static html = html`
    <a href="/">
      <slot></slot>
    </a>
  `
}

export { Logo }
