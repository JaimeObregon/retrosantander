import { app } from './app.js'

const storageKey = 'language'

const i18n = {
  languages: {
    es: 'Castellano',
    en: 'English',
    eu: 'Euskara',
    fr: 'Français',
  },

  setLanguage: () => {
    const preferred = [
      ...new Set(navigator.languages.map((locale) => locale.match(/^../)[0])),
    ]

    const matched =
      preferred.find((language) => app.project.languages.includes(language)) ??
      app.languages[0]

    const stored = localStorage.getItem(storageKey)
    const language = stored ?? matched

    localStorage.setItem(storageKey, language)

    return language
  },

  push: (translations) => {
    Object.entries(translations).forEach(
      ([key, translations]) => (app.translations[key] = translations)
    )
  },

  get: (token, replacements = {}) => {
    const entries = Object.entries(replacements)
    const { language } = app

    if (!entries.length) {
      return app.translations[token][language]
    }

    return entries.reduce((phrase, [key, value]) => {
      const pattern = new RegExp(`\\\${${key}}`, 'g')
      return phrase.replaceAll(pattern, value)
    }, app.translations[token][language])
  },
}

export { i18n, storageKey }
