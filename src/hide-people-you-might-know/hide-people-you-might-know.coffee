module.exports =

  defineSettings: ->
    "friends.noPeopleYouMightKnow":
      defaultValue: on
      onChange: ->


  runBeforeDom: ->
    styles = require "./hide-people-you-might-know-styles"

    styles.use()
