import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'

class LanguagePicker extends MyElement {
  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      font-family: var(--font-sans);
      font-weight: bold;
      user-select: none;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5ch;
      height: var(--header-actions-size);
      font-size: var(--type-medium);
      font-weight: bold;
      color: var(--color-background);
      cursor: pointer;
      background: var(--color-text);
      border: none;
      border-radius: var(--space-small);
      transition: background var(--delay-medium);

      &:hover {
        background: var(--color-accent);
      }

      span {
        font-size: 0.85em;
        text-transform: uppercase;
      }

      rs-icon {
        transition: ease-in-out var(--delay-small);
      }
    }

    form {
      position: absolute;
      top: calc((var(--header-height) + var(--header-actions-size)) / 2);
      right: 0;
      display: none;
      flex-direction: column;
      width: 11em;
      overflow: hidden;
      font-size: var(--type-small);
      color: var(--color-background);
      background: var(--color-text);
      border: 1px solid var(--color-text);
      border-radius: var(--space-small);
      box-shadow: 0 5px 5px var(--color-box-shadow);
      backdrop-filter: blur(var(--panel-blur));

      label {
        padding: var(--space-small) var(--space-medium);
        cursor: pointer;

        &:has(input:checked) {
          color: var(--color-background);
          background: var(--color-accent);
        }

        &:hover,
        &:has(input:checked):hover {
          color: var(--color-text);
          background: var(--color-background);
        }

        input {
          display: none;
        }
      }
    }

    :host(.open) button rs-icon {
      transform: rotate(180deg);
    }

    :host(.open) form {
      display: flex;
    }
  `

  static html = html`
    <button>
      <span></span>
      <rs-icon name="triangleDown"></rs-icon>
    </button>
    <form></form>
  `

  span
  button
  form

  connectedCallback() {
    this.button = this.shadowRoot?.querySelector('button')
    this.form = this.shadowRoot?.querySelector('form')
    this.span = this.shadowRoot?.querySelector('span')

    const { languages } = app.project

    const language = i18n.getLanguage()

    this.span.innerText = language

    this.form.innerHTML = languages
      .map(
        (locale) => html`
          <label>
            <input
              name="language"
              type="radio"
              value="${locale}"
              ${locale === language ? 'checked' : ''}
            />
            ${i18n.languages[locale]}
          </label>
        `,
      )
      .join('')

    this.onButtonClick = () => (this.open = !this.open)

    this.onClick = (event) => {
      if (!this.contains(event.target)) {
        this.open = false
      }
    }

    this.onKeyup = (event) => {
      event.key === 'Escape' && (this.open = false)
    }

    this.onChange = () => {
      const input = this.form.querySelector('input:checked')

      if (input instanceof HTMLInputElement) {
        const language = input.value
        i18n.setLanguage(language)

        this.span.innerText = language
        this.open = false
      }
    }

    this.myAddEventListener(this.button, 'click', this.onButtonClick)
    this.myAddEventListener(document, 'click', this.onClick)
    this.myAddEventListener(document, 'keyup', this.onKeyup)
    this.myAddEventListener(this.form, 'change', this.onChange)
  }

  get open() {
    return this.classList.contains('open')
  }

  set open(value) {
    if (this.open === value) {
      return
    }

    this.classList.toggle('open', value)
  }
}

if (!customElements.get('rs-language-picker')) {
  customElements.define('rs-language-picker', LanguagePicker)
}

export { LanguagePicker }
