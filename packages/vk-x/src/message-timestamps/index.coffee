module.exports =

  defineSettings: ->
    "messages.showTimestamps":
      defaultValue: true


  runBeforeDom: ->
    utils = require "utils"
    require "arrive"
    moment = require "moment"
    i18n = require "../i18n"

    utils.styleConditional "messages.showTimestamps", require "./styles"

    onNewMessage = ->
      return if $( @ ).is ":first-child"

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
