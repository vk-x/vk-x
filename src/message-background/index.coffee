module.exports =

  defineSettings: ->
    "messages.darkerUnread":
      defaultValue: true


  runBeforeDom: ->
    utils = require "../module-utils"
    utils.styleConditional "messages.darkerUnread", require "./styles"
