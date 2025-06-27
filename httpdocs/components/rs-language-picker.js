import { app } from '../modules/app.js'
import { MyElement } from '../modules/element.js'
import { i18n } from '../modules/i18n.js'
import { css, html } from '../modules/strings.js'

class LanguagePicker extends MyElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    form {
      display: flex;
      gap: var(--space-small);

      label {
        padding: 0 var(--space-small);
        cursor: pointer;

        &:has(input[checked]) {
          color: var(--color-accent);
        }

        &:hover {
          text-decoration: underline;
        }

        input {
          display: none;
        }
      }
    }
  `

  static html = `<form></form>`

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
