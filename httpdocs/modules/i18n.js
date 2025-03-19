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

  getPreferredLanguage() {
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

    const defaultLanguage = app.project.languages[0]

    return matched ?? defaultLanguage
  },

  setLanguage: (locale) => {
    const stored = i18n.getLanguage()
    const preferred = i18n.getPreferredLanguage()
    const language = locale ?? stored ?? preferred

    localStorage.setItem(storageKey, language)

    const event = new Event('languagechange')
    window.dispatchEvent(event)
  },

  getLanguage() {
    const preferred = i18n.getPreferredLanguage()
    const stored = localStorage.getItem(storageKey)
    return stored ?? preferred
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
