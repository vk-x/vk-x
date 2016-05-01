module.exports =

  defaultSettings:
    "friends.noPeopleYouMightKnow": true


  run: ->
    styles = require "./hide-people-you-might-know-styles"

    styles.use()
