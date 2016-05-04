IntlMessageFormat = require "intl-messageformat"

cache = {}
currentLanguageId = 3

module.exports = i18n =

  add: ({ messages, languageId, locale }) ->
    cache[ languageId ] ?=
      languageId: languageId
      locale: locale
      messages: {}

    for own key, message of messages
      cache[ languageId ].messages[ key ] ?= new IntlMessageFormat message, locale

    return


  setLanguage: ( newLanguageId ) ->
    if newLanguageId of cache
      currentLanguageId = newLanguageId


  t: ( key, data ) ->
    cache[ currentLanguageId ]?.messages[ key ]?.format data
