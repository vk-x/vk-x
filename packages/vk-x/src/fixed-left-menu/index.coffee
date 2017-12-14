# Fix menu on the page so it doesn't scroll out of view, see #6.

utils = require "utils"

module.exports =

  defineSettings: ->
    "sideMenu.fixPosition":
      defaultValue: true


  runBeforeDom: ->
    utils.styleConditional "sideMenu.fixPosition", require "./styles"
