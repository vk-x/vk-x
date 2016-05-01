module.exports =

  defineSettings: ->
    "photos.noLikeOverlay":
      defaultValue: on
      onChange: ->


  runBeforeDom: ->
    styles = require "./styles"

    styles.use()
