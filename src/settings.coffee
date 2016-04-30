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
      api.storage.get key: "settings"
    .then ( settings = {}) ->
      cache = settings


  saveRemote: ->
    api.storage.set key: "settings", value: cache


  get: ( key ) ->
    cache[ key ]


  set: ( key, value ) ->
    cache[ key ] = value
    Promise.all [ @saveLocal(), @saveRemote() ]


module.exports = settings
