module.exports =

  defineSettings: ->
    "friends.noPeopleYouMightKnow":
      defaultValue: on
      onChange: ->


  runBeforeDom: ->
    styles = require "./styles"

    styles.use()
