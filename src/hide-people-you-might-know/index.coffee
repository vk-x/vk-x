module.exports =

  defineSettings: ->
    "friends.noPeopleYouMightKnow":
      defaultValue: true


  runBeforeDom: ->
    utils = require "utils"
    utils.styleConditional "friends.noPeopleYouMightKnow", require "./styles"
