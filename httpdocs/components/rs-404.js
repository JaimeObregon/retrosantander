import { MyElement } from '../modules/element.js'
import { faceFrown } from '../modules/icons.js'
import { css, html } from '../modules/strings.js'

class NotFound extends MyElement {
  static styles = css`
    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 100vh;
      margin: auto;
      font-size: 18px;
      text-align: center;
    }

    article svg {
      height: 10em;
    }

    article a {
      font-weight: bold;
      color: inherit;
    }

    @media (width <= 640px) {
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
