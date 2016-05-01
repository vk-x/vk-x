module.exports =

  defineSettings: ->
    "messages.darkerUnread":
      defaultValue: true
      onChange: ->


  runBeforeDom: ->
    styles = require "./styles"

    styles.use()
