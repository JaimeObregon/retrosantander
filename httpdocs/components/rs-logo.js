import { MyElement, html, css } from '../modules/element.js'

class Logo extends MyElement {
  static styles = css`
    a {
      display: block;
      padding: 0 var(--gap);
      line-height: var(--header-height);
      color: inherit;
    }

    a ::slotted(svg) {
      height: 40px;
      vertical-align: middle;
      fill: currentcolor;
      fill-rule: evenodd;
      transition: 200ms ease;
    }

    a:hover ::slotted(svg) {
      color: white;
      transform: scale(1.035);
    }
  `

  static html = html`
    <a href="/">
      <slot></slot>
    </a>
  `
}

export { Logo }
