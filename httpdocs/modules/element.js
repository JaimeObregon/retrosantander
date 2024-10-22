// Identidad que utilizo solo para que VS Code coloree la sintaxis.
// Véase https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
const identity = (strings, ...values) => {
  return String.raw({ raw: strings }, ...values)
}

const html = identity
const css = identity

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

export { MyElement, html, css }
