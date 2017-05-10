# Fix menu on the page so it doesn't scroll out of view, see #6.

utils = require "utils"

module.exports =

  defineSettings: ->
    "sideMenu.fixPosition":
      defaultValue: true


  runBeforeDom: ->
    utils.styleConditional "sideMenu.fixPosition", require "./styles"


  run: ->
    # `updateLeftMenu` function is responsible for changing inline styles of
    # the left menu. Overwrite it with an empty function so when the event handler
    # calls it, nothing happens.
    utils.setConditional "sideMenu.fixPosition", window, "updateLeftMenu",
      true: ->

    # Position the menu correctly when disabling this feature.
    utils.runConditional "sideMenu.fixPosition",
      false: ->
        window.updateLeftMenu()
