import { MyElement } from '../modules/element.js'
import { css, html } from '../modules/strings.js'

class Logo extends MyElement {
  static styles = css`
    a {
      display: block;
      padding: 0 var(--gap);
      line-height: var(--header-height);
      color: inherit;

      ::slotted(svg) {
        height: 40px;
        vertical-align: middle;
        fill: currentcolor;
        fill-rule: evenodd;
        transition: var(--delay-medium) var(--ease-1);
      }

      &:hover ::slotted(svg) {
        color: var(--color-highlight);
        transform: scale(1.035);
      }
    }

    @media (width <= 1280px) {
      :host {
        display: none;
      }
    }
  `

  static html = html`
    <a href="/">
      <slot></slot>
    </a>
  `
}

export { Logo }
