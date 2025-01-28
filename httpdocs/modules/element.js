class MyElement extends HTMLElement {
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
}

export { MyElement }
