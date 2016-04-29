api = require "./api"

cache = {}

settings =

  fetchLocal: ->
    new Promise ( resolve ) ->
      chrome.storage.local.get "settings", ({ settings = {}}) ->
        cache = settings
        resolve()


  saveLocal: ->
    new Promise ( resolve ) ->
      chrome.storage.local.set "settings": cache, resolve


  fetchRemote: ->
    api.ready.then ->
      api.storage.get "settings"
    .then ( settings = {}) ->
      cache = settings


  saveRemote: ->
    api.storage.set "settings": cache


  get: ( key ) ->
    cache[ key ]


  set: ( key, value ) ->
    cache[ key ] = value
    Promise.all [ @saveLocal(), @saveRemote() ]


module.exports = settings
