import { MyElement, html, css } from '../modules/element.js'
import { app } from '../modules/app.js'
import { i18n } from '../modules/i18n.js'
import { normalize } from '../modules/strings.js'

const icon = html`
  <svg viewBox="0 0 16 16">
    <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
    />
  </svg>
`

class Search extends MyElement {
  static styles = css`
    label {
      position: relative;
      display: flex;
      align-items: center;
      width: 15em;
      font-size: 16px;
      transition: width 350ms ease;
    }

    label:focus-within {
      width: 22em;
    }

    label svg {
      position: absolute;
      width: 1em;
      left: 0.65em;
      fill: var(--color-text-pale);
      pointer-events: none;
    }

    label input {
      font-size: inherit;
      font-weight: 500;
      width: 100%;
      border: none;
      border-radius: 1rem;
      padding: 0.35em 0.25em 0.35em 2.25em;
      outline: none;
      background: var(--color-highlight-inverted);
      transition: background 350ms ease;
      border: 1px solid var(--color-line);
      box-shadow: 0 0 0 1px var(--color-neutral-50);
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
    }

    label input:hover,
    label input:focus {
      background: white;
    }

    label.open input:focus {
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
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      font-weight: 500;
      color: var(--color-neutral-800);
      overflow: scroll;
      /*box-shadow: 0 1px 0 1px var(--color-backdrop);*/
      border: 1px solid var(--color-line);
      border-top: none;
    }

    label.open ul {
      display: block;
    }

    label ul li a {
      display: block;
      padding: 8px var(--gap) 8px 35px;
      color: inherit;
      text-decoration: none;
    }

    label ul li a.selected {
      color: var(--color-accent);
      background: var(--color-background);
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
      label {
        font-size: 15px;
      }

      label:focus-within {
        width: 18rem;
      }
    }

    @media (width <= 1024px) {
      label {
        width: 12rem;
      }

      label:focus-within {
        width: 15rem;
      }
    }

    @media (width <= 768px) {
      label {
        width: 8rem;
        font-size: 14px;
      }

      label:focus-within {
        width: 12rem;
      }
    }

    @media (width <= 640px) {
      label {
        width: 2rem;
        font-size: 13px;
      }
    }
  `

  static html = html`
    <label>
      ${icon}
      <input type="search" />
      <ul></ul>
    </label>
  `

  selection
  results
  label
  input
  value
  ul

  constructor() {
    super()

    i18n.push({
      'search.placeholder': {
        es: 'Buscar…',
        eu: 'Bilatu…',
        en: 'Search…',
        fr: 'Rechercher…',
      },
    })
  }

  onLanguagechange() {
    this.input.setAttribute('placeholder', i18n.get('search.placeholder'))
  }

  connectedCallback() {
    this.label = this.shadowRoot.querySelector('label')
    this.input = this.shadowRoot.querySelector('input')
    this.ul = this.shadowRoot.querySelector('ul')

    document.addEventListener('keydown', (event) => {
      if (event.key.length === 1 || event.key === 'Backspace') {
        this.input.focus()
      }

      const actions = {
        Escape: () => this.label.classList.remove('open'),
        Enter: () => this.results[this.selected]?.click(),
        ArrowUp: () => --this.selected,
        ArrowDown: () =>
          this.selected === undefined ? (this.selected = 0) : ++this.selected,
      }

      if (!actions[event.key]) {
        return
      }

      actions[event.key]()

      this.results.forEach((result, index) => {
        this.selected === index &&
          result.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })

      event.preventDefault()
    })

    this.ul.addEventListener('mouseover', (event) => {
      const li = event.target.closest('li')
      if (!li) {
        return
      }

      this.selected = this.results
        .map((result) => result.innerText)
        .indexOf(li.innerText)
    })

    this.input.addEventListener('input', () => {
      this.query = this.input.value
    })

    this.input.addEventListener('focus', () => {
      this.label.classList.toggle('open', this.results?.length)

      const end = this.input.value.length
      this.input.setSelectionRange(end, end)
    })

    this.input.addEventListener('blur', () => {
      this.label.classList.remove('open')
    })

    // window.addEventListener('popstate', () => {
    //   const url = new URL(document.location.href)
    //   this.query = url.searchParams.get('q')
    // })

    window.addEventListener('languagechange', this.onLanguagechange.bind(this))
  }

  get query() {
    return this.value
  }

  set query(value) {
    this.value = this.input.value = value ?? ''
    app.search()
  }

  get selected() {
    return this.selection
  }

  set selected(value) {
    const last = this.results.length - 1
    value = value < 0 ? 0 : Math.min(value, last)

    this.selection = value

    this.results.forEach((result, index) =>
      result.classList.toggle('selected', index === value),
    )
  }

  set suggestions(suggestions) {
    const query = normalize(this.query)
    this.ul.innerHTML = suggestions
      .map(
        (q) => `
          <li>
            <a href="/?q=${q}">
              ${icon} ${q.replace(query, `<mark>${query}</mark>`)}
            </a>
          </li>`,
      )
      .join('')

    this.results = [...this.ul.querySelectorAll('a')]

    if (document.activeElement === this) {
      this.label.classList.toggle('open', suggestions.length)
    }

    delete this.selection
  }
}

export { Search }
