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
    }

    label {
      padding: 0 var(--space-small);
      cursor: pointer;
    }

    label.selected {
      color: var(--color-accent);
    }

    label:hover {
      text-decoration: underline;
    }

    input {
      display: none;
    }
  `

  static html = html`<form></form>`

  connectedCallback() {
    this.form = this.shadowRoot?.querySelector('form')

    if (!this.form) {
      return
    }

    const { languages } = app.project

    if (languages.length < 2) {
      this.form.setAttribute('hidden', '')
    }

    this.form.innerHTML = languages
      .map(
        (language) => html`
          <label
            ${language === app.language ? 'class="selected"' : ''}
            title="${i18n.languages[language]}"
          >
            <input
              name="language"
              type="radio"
              value="${language}"
              ${language === app.language ? 'checked' : ''}
            />
            ${language}
          </label>
        `,
      )
      .join('')

    this.form.addEventListener('click', (event) => event.stopPropagation())

    this.form.addEventListener('change', () => {
      if (!this.form) {
        return
      }

      const labels = [...this.form.querySelectorAll('label')]
      labels.forEach((label) => {
        const checked = label.querySelector('input:checked')
        label.classList.toggle('selected', Boolean(checked))
      })

      const input = this.form.querySelector('input:checked')

      if (!(input instanceof HTMLInputElement)) {
        return
      }

      const storageKey = app.storageKeys.language

      const value = input.value
      app.language = value
      localStorage.setItem(storageKey, value)

      const event = new Event('languagechange')
      window.dispatchEvent(event)
    })
  }
}

if (!customElements.get('rs-language-picker')) {
  customElements.define('rs-language-picker', LanguagePicker)
}

export { LanguagePicker }
