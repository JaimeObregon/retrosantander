import { MyElement } from '../modules/element.js'
import { html } from '../modules/strings.js'

class LicenseCDIS extends MyElement {
  static html = `<slot></slot>`

  connectedCallback() {
    this.innerHTML = html`
      Esta imagen es obra de su autor, y sus derechos pertenecen al Centro de
      Documentación de la Imagen de Santander (<abbr>CDIS</abbr>), una entidad
      pública dependiente del Ayuntamiento de Santander. Por favor
      <a href="https://portal.ayto-santander.es/portalcdis/"
        >contacta con el <abbr>CDIS</abbr></a
      >
      y adquiere la versión de alta resolución antes de hacer una utilización
      comercial de esta imagen.
    `
  }
}

if (!customElements.get('rs-license-cdis')) {
  customElements.define('rs-license-cdis', LicenseCDIS)
}

export { LicenseCDIS }
