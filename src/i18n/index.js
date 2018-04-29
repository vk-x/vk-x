import IntlMessageFormat from 'intl-messageformat'

const cache = {}
let currentLanguageId = 3

export default {
  add ({messages, languageId, locale, aliases = []}) {
    if (cache[ languageId ] == null) {
      cache[languageId] = {
        languageId,
        locale,
        messages: {}
      }
    }

    Object.keys(messages).forEach(key => {
      const message = messages[key]
      cache[languageId].messages[key] = new IntlMessageFormat(message, locale)
    })

    // A temporary feature that allows to fall back to different languages.
    aliases.forEach(alias => {
      cache[alias] = cache[alias] || cache[languageId]
    })
  },

  setLanguage (newLanguageId) {
    if (newLanguageId in cache) {
      currentLanguageId = newLanguageId
    }
  },

  getCurrentLocale () {
    const currentLocale = cache[currentLanguageId] && cache[currentLanguageId].locale
    return currentLocale != null ? currentLocale : document.documentElement.getAttribute('lang')
  },

  t (key, data) {
    const message = cache[currentLanguageId] && cache[currentLanguageId].messages[key]
    return message != null ? message.format(data) : undefined
  }
}
