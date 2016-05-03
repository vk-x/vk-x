module.exports =

  defineSettings: ->
    "friends.onlineByDefault":
      defaultValue: false


  run: ->
    utils = require "utils"

    friendsLink = $ "#l_fr > a"
    utils.setConditional "friends.onlineByDefault", friendsLink, "href",
      true: "/friends?section=online"
