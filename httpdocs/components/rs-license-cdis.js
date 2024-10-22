import { MyElement, html, css } from '../modules/element.js'

class LicenseCDIS extends MyElement {
  static styles = css`
    details {
      padding: 0 22px 5px;
      margin: calc(2 * var(--gap)) 0 0;
      font-size: 14px;
      font-weight: 400;
      hyphens: auto;
      background: var(--color-neutral-800);
      border-radius: 5px;
    }

    details summary {
      padding: 10px 7px;
      margin: 0 -22px -10px;
      font-size: 14px;
      font-weight: 600;
      hyphens: none;
      cursor: pointer;
      background: var(--color-neutral-800);
      border-radius: 5px;
      transition: background ease-in-out 150ms;
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
      text-decoration-thickness: 2px;
      text-decoration-style: dotted;
    }

    details a:hover {
      text-decoration-style: solid;
    }
  `

  static html = html`
    <details>
      <summary>Derechos de esta imagen</summary>

      <p>
        Esta imagen es obra de su autor, y sus derechos pertenecen al Centro de
        Documentación de la Imagen de Santander (CDIS), una entidad dependiente
        del Ayuntamiento de Santander.
      </p>

      <p>
        Por favor
        <a href="https://portal.ayto-santander.es/portalcdis/"
          >contacta con el CDIS</a
        >
        y adquiere la versión de alta resolución antes de hacer una utilización
        comercial de esta imagen.
      </p>
    </details>
  `
}

export { LicenseCDIS }
