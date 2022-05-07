import { app } from '../modules/retrosantander.js'

const component = 'rs-search'
const template = document.createElement('template')

const icon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
`

template.innerHTML = `
  <style>
    label {
      position: relative;
      display: flex;
      width: 15em;
      align-items: center;
      transition: width 350ms ease;
    }

    label:focus-within {
      width: 22em;
    }

    label svg {
      position: absolute;
      width: 16px;
      left: 10px;
      fill: var(--color-neutral-500);
      pointer-events: none;
    }

    label input {
      font-size: 14px;
      font-weight: 500;
      width: 100%;
      height: 30px;
      border: none;
      border-radius: 1em;
      padding: 5px 15px 5px 35px;
      outline: none;
      background: var(--color-neutral-200);
      transition: background 350ms ease;
      border: 1px solid var(--color-neutral-900);
      box-shadow: 0 0 0 1px var(--color-neutral-50);
      cursor: pointer;
    }

    label input:hover,
    label input:focus {
      background: white;
    }

    label.open:focus-within input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    label ul {
      display: none;
      position: absolute;
      z-index: 1;
      top: 29px;
      left: 0;
      width: 100%;
      max-height: 70vh;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      background: white;
      border-bottom-left-radius: 1em;
      border-bottom-right-radius: 1em;
      font-size: 14px;
      font-weight: 500;
      color: var(--color-neutral-800);
      overflow: scroll;
      box-shadow: 0 1px 0 1px var(--color-neutral-50);
      border: 1px solid var(--color-neutral-900);
      border-top: none;
    }

    label.open:focus-within ul {
      display: block;
    }

    label ul li a {
      display: block;
      padding: 10px var(--gap) 10px 35px;
      text-decoration: none;
      color: inherit;
    }

    label ul li a.selected {
      background: var(--color-neutral-200);
    }

    label ul li a svg {
      position: absolute;
    }

    label ul li a mark {
      font-weight: 700;
      background: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
    }

    @media (max-width: 1280px) {
      label:focus-within {
        width: 18em;
      }
    }

    @media (max-width: 1024px) {
      label {
        width: 12em;
      }

      label:focus-within {
        width: 15em;
      }
    }

    @media (max-width: 768px) {
      label:focus-within {
        width: 12em;
      }
    }

    @media (max-width: 640px) {
      label {
        width: 6em;
      }
    }
  </style>
  <label>
    ${icon}
    <input type="search" autofocus data-placeholder="Buscar…" />
    <ul></ul>
  </label>
`

customElements.define(
  component,

  class extends HTMLElement {
    delay = 350
    selected
    results
    label
    input
    value
    ul

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.label = this.shadowRoot.querySelector('label')
      this.input = this.shadowRoot.querySelector('input')
      this.ul = this.shadowRoot.querySelector('ul')

      document.addEventListener('keydown', (event) => {
        this.input.focus()

        const actions = {
          Escape: () => this.label.classList.remove('open'),
          Enter: () => this.results[this.selection]?.click(),
          ArrowUp: () => --this.selection,
          ArrowDown: () =>
            this.selection === undefined
              ? (this.selection = 0)
              : ++this.selection,
        }

        if (!actions[event.key]) {
          return
        }

        actions[event.key]()

        this.results.forEach((result, index) => {
          index === this.selection &&
            result.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })

        event.preventDefault()
      })

      this.ul.addEventListener('mouseover', (event) => {
        const li = event.target.closest('li')
        if (!li) {
          return
        }

        this.selection = this.results
          .map((result) => result.innerText)
          .indexOf(li.innerText)
      })

      this.input.addEventListener('input', (event) => {
        if (this.query.trim() !== event.target.value.trim()) {
          this.query = this.input.value
        }
      })

      this.input.addEventListener('click', () => {
        this.label.classList.toggle('open', this.results.length)
      })

      this.input.addEventListener('focus', () => {
        this.label.classList.toggle('open', this.results.length)
      })

      window.addEventListener('popstate', this.init.bind(this))
    }

    init() {
      const url = new URL(document.location.href)
      this.query = url.searchParams.get('q')
      app.search()
    }

    get query() {
      return this.value
    }

    set query(value) {
      this.value = this.input.value = value ?? ''
      app.search()
    }

    get selection() {
      return this.selected
    }

    set selection(value) {
      value =
        value < 0
          ? 0
          : value < this.results.length - 1
          ? value
          : this.results.length - 1

      this.selected = value

      this.results.forEach((result, index) =>
        result.classList.toggle('selected', index === value)
      )
    }

    set suggestions(suggestions) {
      this.ul.innerHTML = suggestions
        .map(
          (q) => `
            <li>
            <a href="/?q=${q}">
                ${icon} ${q.replace(this.query, `<mark>${this.query}</mark>`)}
                </a>
            </li>`
        )
        .join('')

      this.results = [...this.ul.querySelectorAll('a')]

      this.label.classList.toggle('open', suggestions.length)
      delete this.selected
    }
  }
)
