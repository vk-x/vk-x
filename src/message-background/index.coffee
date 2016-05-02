module.exports =

  defineSettings: ->
    "messages.darkerUnread":
      defaultValue: true


  runBeforeDom: ->
    utils = require "utils"
    utils.styleConditional "messages.darkerUnread", require "./styles"
