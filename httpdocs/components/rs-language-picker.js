import { app } from '../modules/app.js'
import { i18n } from '../modules/i18n.js'
import { storageKey } from '../modules/i18n.js'
import { MyElement, html, css } from '../modules/element.js'

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

    this.sound = new Audio('/assets/sounds/activate.mp3')

    const { languages } = app.project

    if (languages.length < 2) {
      this.form.setAttribute('hidden', true)
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
      this.sound.play()

      const labels = [...this.form.querySelectorAll('label')]
      labels.forEach((label) => {
        const checked = label.querySelector('input:checked')
        label.classList.toggle('selected', Boolean(checked))
      })

      const value = this.form.querySelector('input:checked').value
      app.language = value
      localStorage.setItem(storageKey, value)

      const event = new Event('languagechange')
      window.dispatchEvent(event)
    })
  }
}

export { LanguagePicker }
