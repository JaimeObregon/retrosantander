import { app } from '../modules/app.js'
import { database } from '../modules/database.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html, normalize } from '../modules/strings.js'

const debounceDelay = 350

const icon = html`
  <svg viewBox="0 0 16 16">
    <path
      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
    />
  </svg>
`

class Search extends MyElement {
  static styles = css`
    :host {
      flex-shrink: 0;

      --max-suggestions: 10;
      --width-closed: 10em;
      --width-open: 22em;
    }

    label {
      position: relative;
      display: flex;
      align-items: center;
      font-size: var(--type-small);
      font-weight: 400;

      svg {
        position: absolute;
        left: var(--space-small);
        height: 55%;
        pointer-events: none;
        fill: var(--color-search-placeholder);
      }

      input {
        width: var(--width-closed);
        height: var(--space-large);
        padding: 0 var(--space-medium) 0 var(--space-large);
        font-size: inherit;
        color: var(--color-search-text);
        appearance: none;
        cursor: pointer;
        outline: none;
        background: var(--color-search-background);
        border: 1px solid var(--color-border);
        border-radius: 1em;
        transition:
          background var(--delay-large) ease,
          width var(--delay-large) ease;

        &:focus {
          width: var(--width-open);
        }

        &::placeholder {
          color: var(--color-search-placeholder);
          opacity: 1;
        }

        &:hover,
        &:focus {
          background: var(--color-search-highlighted);
        }
      }

      &.open {
        input:focus {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        ul {
          display: block;
        }
      }

      ul {
        position: absolute;
        top: calc(var(--space-large) - 1px);
        left: 0;
        z-index: 1;
        box-sizing: border-box;
        display: none;
        width: 100%;
        max-height: min(
          calc(var(--max-suggestions) * var(--space-large)),
          calc(100vh - 2 * var(--space-large))
        );
        padding: 0;
        margin: 0;
        overflow: scroll;
        color: var(--color-search-placeholder);
        list-style: none;
        background: var(--color-search-highlighted);
        border: 1px solid var(--color-border);
        border-top: none;
        border-bottom-right-radius: 1em;
        border-bottom-left-radius: 1em;

        li {
          a {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 var(--space-small) 0 var(--space-large);
            line-height: var(--space-large);
            color: var(--color-search-text);
            text-decoration: none;

            &.selected {
              color: var(--color-search-selected-color);
              background: var(--color-search-selected-background);
            }

            svg {
              position: absolute;
            }

            mark {
              font-weight: 700;
              color: inherit;
              text-decoration: underline;
              text-decoration-thickness: 2px;
              text-decoration-style: dotted;
              text-underline-offset: 3px;
              background: inherit;
            }
          }
        }
      }
    }

    @media (width <= 1280px) {
      :host {
        --width-open: 18em;
      }
    }

    @media (width <= 1024px) {
      :host {
        --width-open: 15em;
      }
    }

    @media (width <= 768px) {
      :host {
        --width-open: 12em;
      }
    }

    @media (width <= 640px) {
      :host {
        --width-closed: var(--space-large);
      }

      label:not(:focus-within) {
        input {
          padding: 0;
          color: transparent;

          &::placeholder {
            opacity: 0;
          }
        }
      }
    }
  `

  static html = html`
    <label>
      ${icon} <input type="text" name="q" autocomplete="off" />
      <ul></ul>
    </label>
  `

  selection
  results
  label
  input
  value = ''
  ul

  connectedCallback() {
    this.label = this.shadowRoot?.querySelector('label')
    this.input = this.shadowRoot?.querySelector('input')
    this.ul = this.shadowRoot?.querySelector('ul')

    i18n.push({
      'search.placeholder': {
        es: 'Buscar…',
        eu: 'Bilatu…',
        en: 'Search…',
        fr: 'Rechercher…',
      },
    })

    this.onKeydown = (event) => {
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
    }

    this.onMouseover = (event) => {
      const li = event.target.closest('li')
      if (!li) {
        return
      }

      this.selected = this.results
        .map((result) => result.innerText)
        .indexOf(li.innerText)
    }

    this.onMousedown = (event) => {
      event.target.click()
    }

    this.onInput = () => {
      this.query = this.input.value
    }

    this.onFocus = () => {
      this.label.classList.toggle('open', this.results?.length)

      const end = this.input.value.length
      this.input.setSelectionRange(end, end)
    }

    this.onBlur = () => {
      this.label.classList.remove('open')
    }

    this.onPopstate = () => {
      const url = new URL(document.location.href)
      this.query = url.searchParams.get('q') ?? ''
    }

    this.onLanguagechange = () => {
      this.input.setAttribute('placeholder', i18n.get('search.placeholder'))
    }

    this.myAddEventListener(document, 'keydown', this.onKeydown)
    this.myAddEventListener(this.ul, 'mouseover', this.onMouseover)
    this.myAddEventListener(this.ul, 'mousedown', this.onMousedown)
    this.myAddEventListener(this.input, 'input', this.onInput)
    this.myAddEventListener(this.input, 'focus', this.onFocus)
    this.myAddEventListener(this.input, 'blur', this.onBlur)
    this.myAddEventListener(window, this.onPopstate)
    this.myAddEventListener(window, 'languagechange', this.onLanguagechange)
  }

  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  // Devuelve el término de la búsqueda actual
  get query() {
    return this.value
  }

  // Lanza una búsqueda del término existente en `this.query`
  set query(value) {
    if (!database.records) {
      return
    }

    this.value = this.input.value = value ?? ''

    const { results, suggestions } = database.search(this.value)

    app.results = app.results ?? []

    this.suggestions = suggestions

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (results.length && unchanged) {
      return
    }

    app.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      const url = new URL(document.location.href)
      if (app.query !== url.searchParams.get('q')) {
        history.pushState(null, '', app.query ? `/?q=${app.query}` : '/')
      }

      const detail = { results }
      const event = new CustomEvent('searchcomplete', { detail })
      window.dispatchEvent(event)
    }, debounceDelay)
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
        (q) => html`
          <li>
            <a href="/?q=${q}">
              ${icon} ${q.replace(query, `<mark>${query}</mark>`)}
            </a>
          </li>
        `,
      )
      .join('')

    this.results = [...this.ul.querySelectorAll('a')]

    if (document.activeElement === this) {
      this.label.classList.toggle('open', suggestions.length)
    }

    delete this.selection
  }
}

if (!customElements.get('rs-search')) {
  customElements.define('rs-search', Search)
}

export { Search }
