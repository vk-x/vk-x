module.exports =

  defineSettings: ->
    "messages.darkerUnread":
      defaultValue: true
      onChange: ->


  runBeforeDom: ->
    styles = require "./message-background-styles"

    styles.use()
