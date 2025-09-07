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
    }

    button {
      display: flex;
      align-items: center;
      height: var(--header-actions-size);
      padding: 0 var(--space-x-small);
      font-size: var(--type-medium);
      font-weight: bold;
      color: var(--color-background);
      background: var(--color-text);
      border: none;
      border-radius: var(--space-small);
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      -webkit-tap-highlight-color: transparent;
    }

    form {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      color: var(--color-background);
      background: var(--color-text);
      border-radius: var(--space-small);
      border-top-right-radius: 0;
      overflow: hidden;
      box-shadow: 0 5px 5px var(--color-box-shadow);
      backdrop-filter: blur(var(--panel-blur));
      font-size: var(--type-small);

      label {
        padding: var(--space-x-small) var(--space-medium);
        cursor: pointer;

        :is(&:has(input[checked]), &:hover) {
          color: var(--color-background);
          background: var(--color-accent);
        }

        input {
          display: none;
        }
      }
    }
  `

  static html = html`
    <button>EU <rs-icon name="chevronDown"></rs-icon></button>
    <form></form>
  `

  connectedCallback() {
    this.form = this.shadowRoot?.querySelector('form')

    if (!this.form) {
      return
    }

    const { languages } = app.project

    const language = i18n.getLanguage()

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

    // this.form.innerHTML = 'eu'

    this.onClick = (event) => event.stopPropagation()

    this.onChange = () => {
      if (!this.form) {
        return
      }
      const input = this.form.querySelector('input:checked')

      if (input instanceof HTMLInputElement) {
        const language = input.value
        i18n.setLanguage(language)
      }
    }

    this.myAddEventListener(this.form, 'click', this.onClick)
    this.myAddEventListener(this.form, 'change', this.onChange)
  }
}

if (!customElements.get('rs-language-picker')) {
  customElements.define('rs-language-picker', LanguagePicker)
}

export { LanguagePicker }
