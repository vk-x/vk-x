IntlMessageFormat = require "intl-messageformat"

cache = {}
language = "en"

module.exports = i18n =

  add: ( messages, language ) ->
    for own key, message of messages
      cache[ language ] ?= {}
      cache[ language ][ key ] ?= new IntlMessageFormat message, language


  setLanguage: ( newLanguage ) ->
    language = newLanguage


  t: ( key, data ) ->
    cache[ language ]?[ key ]?.format data
