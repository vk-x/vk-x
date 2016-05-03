api = require "./api"
pubsub = require "pubsub-js"

cache = {}

settings =

  on: ( topic, listener ) ->
    pubsub.subscribe "settings.#{topic}", ( msg, data ) ->
      listener data


  trigger: ( topic, data ) ->
    pubsub.publish "settings.#{topic}", data


  add: ( newSettings ) ->
    for own key, { defaultValue, onChange } of newSettings
      cache[ key ] ?= defaultValue
      if onChange
        @on "set.#{key}", onChange
      key


  fetchLocal: ->
    new Promise ( resolve ) ->
      parsed = JSON.parse ( window.localStorage[ "vkx-settings" ] ? "{}" )
      for own key, value of parsed
        if cache[ key ] isnt value
          cache[ key ] = value
          settings.trigger "set.#{key}", { key, value }

      resolve cache


  saveLocal: ->
    new Promise ( resolve ) ->
      window.localStorage[ "vkx-settings" ] = JSON.stringify cache
      resolve cache


  fetchRemote: ->
    api.ready.then ->
      api.storage.get key: "settings"
    .then ( raw = "{}" ) ->
      parsed = JSON.parse raw
      for own key, value of parsed
        if cache[ key ] isnt value
          cache[ key ] = value
          settings.trigger "set.#{key}", { key, value }


  saveRemote: ->
    api.storage.set key: "settings", value: JSON.stringify cache


  get: ( keysOrKey ) ->
    if Array.isArray keysOrKey
      result = {}
      for key in keysOrKey
        result[ key ] = cache[ key ]
      result

    else
      cache[ keysOrKey ]


  set: ( key, value ) ->
    cache[ key ] = value
    settings.trigger "set.#{key}", { key, value }

    @saveLocal()


module.exports = settings
