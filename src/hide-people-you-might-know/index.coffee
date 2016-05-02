module.exports =

  defineSettings: ->
    "friends.noPeopleYouMightKnow":
      defaultValue: true


  runBeforeDom: ->
    utils = require "../module-utils"
    utils.styleConditional "friends.noPeopleYouMightKnow", require "./styles"
