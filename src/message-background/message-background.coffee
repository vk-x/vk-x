module.exports =

  defaultSettings:
    "messages.darkerUnread": true


  runBeforeDom: ->
    styles = require "./message-background-styles"

    styles.use()
