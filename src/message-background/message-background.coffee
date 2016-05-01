module.exports =

  defaultSettings:
    "messages.darkerUnread": true


  run: ->
    styles = require "./message-background-styles"

    styles.use()
