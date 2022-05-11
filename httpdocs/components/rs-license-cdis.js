const component = 'rs-license-cdis'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    details {
      font-size: 14px;
      font-weight: 400;
      margin: calc(2 * var(--gap)) 0 0 0;
      padding: 0 22px 5px 22px;
      border-radius: 5px;
      background: var(--color-neutral-800);
      hyphens: auto;
    }

    details summary {
      padding: 10px 7px;
      margin: 0 -22px -10px -22px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 5px;
      hyphens: none;
      cursor: pointer;
      transition: background ease-in-out 150ms;
      background: var(--color-neutral-800);
    }

    details summary:hover {
      background: var(--color-neutral-700);
    }

    details p {
      color: var(--color-neutral-300);
    }

    details a {
      color: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
    }

    details a:hover {
      text-decoration-style: solid;
    }
  </style>
  <details>
    <summary>Derechos de esta imagen</summary>

    <p>
      Esta imagen es obra de su autor, y sus derechos pertenecen al Centro de
      Documentación de la Imagen de Santander (CDIS), una entidad dependiente
      del Ayuntamiento de Santander.
    </p>

    <p>
      Por favor <a href="https://portal.ayto-santander.es/portalcdis/">contacta
      con el CDIS</a> y adquiere la versión de alta resolución antes de hacer
      una utilización comercial de esta imagen.
    </p>
  </details>
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
