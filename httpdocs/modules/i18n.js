import { app } from './app.js'

const storageKey = 'language'

const i18n = {
  languages: {
    es: 'Castellano',
    en: 'English',
    eu: 'Euskara',
    fr: 'Français',
  },

  translations: {},

  setLanguage: (language) => {
    if (!language) {
      const preferred = [
        ...new Set(
          navigator.languages
            .map((locale) => locale.match(/^../))
            .filter((match) => match !== null)
            .map((match) => match[0]),
        ),
      ]

      const matched = preferred.find((locale) =>
        app.project.languages.includes(locale),
      )

      const stored = i18n.getLanguage()

      const defaultLanguage = app.project.languages[0]

      const language = stored ?? matched ?? defaultLanguage
      i18n.setLanguage(language)

      return
    }

    localStorage.setItem(storageKey, language)

    const event = new Event('languagechange')
    window.dispatchEvent(event)

    return language
  },

  getLanguage() {
    const stored = localStorage.getItem(storageKey)
    const language = stored ?? i18n.setLanguage()
    return language
  },

  push: (translations) => {
    Object.entries(translations).forEach(
      ([key, translations]) => (i18n.translations[key] = translations),
    )
  },

  get: (token, replacements = {}) => {
    const entries = Object.entries(replacements)
    const language = i18n.getLanguage()

    if (!entries.length) {
      return i18n.translations[token][language]
    }

    return entries.reduce((phrase, [key, value]) => {
      const pattern = new RegExp(`\\\${${key}}`, 'g')
      return phrase.replaceAll(pattern, value)
    }, i18n.translations[token][language])
  },
}

export { i18n }
