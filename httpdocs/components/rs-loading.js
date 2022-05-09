const component = 'rs-loading'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 0;
      height: 8px;
      background: var(--color-neutral-300);
      transition: width ease-in 100ms;
    }
  </style>
  <footer></footer>
`

customElements.define(
  component,

  class extends HTMLElement {
    delay = 250
    footer

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.footer = this.shadowRoot.querySelector('footer')
    }

    set progress(value) {
      this.footer.classList.remove('hidden')
      this.footer.style.width = `${100 * value}%`
      value === 1 && setTimeout(() => (this.progress = 0), this.delay)
    }
  }
)
