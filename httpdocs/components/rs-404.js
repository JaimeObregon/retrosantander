import { faceFrown } from '../modules/icons.js'
import { MyElement, html, css } from '../modules/element.js'

class NotFound extends MyElement {
  static styles = css`
    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 18px;
      min-height: 100vh;
      margin: auto;
      text-align: center;
    }

    article svg {
      height: 10em;
    }

    article a {
      color: inherit;
      font-weight: bold;
    }

    @media (max-width: 640px) {
      article {
        font-size: 15px;
      }
    }
  `

  static html = html`
    <article>
      ${faceFrown}
      <h1>Página no encontrada</h1>
      <p>Mejor ve a <a href="/">la portada</a>.</p>
    </article>
  `
}

export { NotFound }
