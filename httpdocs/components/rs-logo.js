import { app } from '../modules/retrosantander.js'

const component = 'rs-logo'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    a {
      display: block;
      line-height: var(--header-height);
      padding: 0 var(--gap);
      color: inherit;
    }

    a ::slotted(svg) {
      height: 30px;
      vertical-align: middle;
      transition: 200ms ease;
      fill: currentColor;
      fill-rule: evenodd;
    }

    a:hover ::slotted(svg) {
      transform: scale(1.035);
      color: white;
    }
  </style>
  <a href="/">
    <slot></slot>
  </a>
`

customElements.define(
  component,

  class extends HTMLElement {
    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }
  }
)
