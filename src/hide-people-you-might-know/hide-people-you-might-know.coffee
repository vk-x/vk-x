module.exports =

  defaultSettings:
    "friends.noPeopleYouMightKnow": true


  runBeforeDom: ->
    styles = require "./hide-people-you-might-know-styles"

    styles.use()
