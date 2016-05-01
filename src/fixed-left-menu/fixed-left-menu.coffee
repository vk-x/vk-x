# Fix menu on the page so it doesn't scroll out of view, see #6.

module.exports =

  defineSettings: ->
    "sideMenu.fixPosition":
      defaultValue: on
      onChange: ->


  runBeforeDom: ->
    styles = require "./fixed-left-menu-styles"

    styles.use()


  run: ->
    # `updateLeftMenu` function is responsible for changing inline styles of
    # the left menu. Overwrite it with an empty function so when the event handler
    # calls it, nothing happens.
    window.updateLeftMenu = ->
