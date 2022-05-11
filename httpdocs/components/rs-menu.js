const component = 'rs-menu'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    button {
      padding: 0;
      margin: 0 var(--gap);
      border: none;
      background: none;
      color: inherit;
      transition: 250ms;
      cursor: pointer;
    }

    button:hover {
      color: white;
    }

    button.open {
      transform: rotate(90deg);
    }

    button svg {
      height: 25px;
      vertical-align: middle;
      fill: currentColor;
      transition: transform 200ms ease;
    }

    article {
      --about-width: 28rem;
      position: fixed;
      width: 100%;
      max-width: var(--about-width);
      height: calc(100vh - var(--header-height));
      top: var(--header-height);
      right: 0;
      overflow: scroll;
      box-sizing: border-box;
      padding: var(--gap);
      border-left: 1px solid var(--color-neutral-800);
      box-shadow: -5px 0 5px #1c191750;
      background-color: #171717f0; /* --color-neutral-900 */
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: 350ms;
      font-size: 15px;
      font-weight: 400;
      padding: var(--gap);
      transform: translateX(var(--about-width));
      opacity: 0;
    }

    article.open {
      transform: translateX(0);
      opacity: 1;
    }

    @media (max-width: 640px) {
      article {
        --about-width: 100%;
      }
    }
  </style>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
    </svg>
  </button>
  <article>
    <slot></slot>
  </article>
`

customElements.define(
  component,

  class extends HTMLElement {
    hamburger
    article

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.hamburger = this.shadowRoot.querySelector('button')
      this.article = this.shadowRoot.querySelector('article')

      this.hamburger.addEventListener('click', () => (this.open = !this.open))

      document.addEventListener('click', (event) => {
        event.target !== this && (this.open = false)
      })

      document.addEventListener('keyup', (event) => {
        event.key === 'Escape' && (this.open = false)
      })
    }

    get open() {
      return this.hamburger.classList.contains('open')
    }

    set open(value) {
      this.hamburger.classList.toggle('open', value)
      this.article.classList.toggle('open', value)
    }
  }
)
