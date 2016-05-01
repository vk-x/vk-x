module.exports =

  defineSettings: ->
    "photos.noLikeOverlay":
      defaultValue: on
      onChange: ->


  runBeforeDom: ->
    styles = require "./remove-photo-like-styles"

    styles.use()
