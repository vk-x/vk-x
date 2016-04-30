api = require "./api"
pubsub = require "pubsub-js"

cache = {}

settings =

  on: ( topic, listener ) ->
    pubsub.subscribe "settings.#{topic}", ( msg, data ) ->
      listener data


  trigger: ( topic, data ) ->
    pubsub.publish "settings.#{topic}", data


  fetchLocal: ->
    new Promise ( resolve ) ->
      cache = JSON.parse ( window.localStorage[ "vkx-settings" ] ? "{}" )
      resolve cache


  saveLocal: ->
    new Promise ( resolve ) ->
      window.localStorage[ "vkx-settings" ] = JSON.stringify cache
      resolve cache


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
    settings.trigger "set.#{key}", { key, value }

    Promise.all [ @saveLocal(), @saveRemote() ]


module.exports = settings
