class MyElement extends HTMLElement {
  #listeners = []

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })

    // @ts-ignore
    const styles = this.constructor.styles
    // @ts-ignore
    const html = this.constructor.html

    if (styles) {
      const stylesheet = new CSSStyleSheet()
      stylesheet.replaceSync(styles)
      shadowRoot.adoptedStyleSheets = [stylesheet]
    }

    if (html) {
      shadowRoot.innerHTML = html
    }
  }

  disconnectedCallback() {
    this.#listeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options)
    })

    this.#listeners = []
  }

  myAddEventListener(target, type, handler, options) {
    target.addEventListener(type, handler, options)
    this.#listeners.push({ target, type, handler, options })
  }
}

export { MyElement }
