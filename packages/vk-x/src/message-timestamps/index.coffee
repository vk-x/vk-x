module.exports =

  defineSettings: ->
    "messages.showTimestamps":
      defaultValue: true


  run: ->
    utils = require "utils"
    require "arrive"
    moment = require "moment"
    i18n = require "../i18n"

    utils.styleConditional "messages.showTimestamps", require "./styles"

    onNewMessage = ->
      return if $( @ ).is ":first-child"
      return if $( @ ).find( ".vkx-message-time" ).length # Fixes #47

      rawTimestamp = $( @ ).data "ts"
      parsedTime = moment.unix rawTimestamp
      timeFormat = if i18n.getCurrentLocale() is "en" then "h:mm a" else "HH:mm"
      formattedTime = parsedTime.format timeFormat

      $( @ ).prepend "<span class='vkx-message-time'>#{formattedTime}</span>"

    utils.runConditional "messages.showTimestamps",
      true: ->
        document.arrive ".im-mess", onNewMessage
        $( ".im-mess" ).each onNewMessage
      false: ->
        document.unbindArrive onNewMessage
        $( ".vkx-message-time" ).remove()
