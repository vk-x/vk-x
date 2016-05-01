module.exports =

  defaultSettings:
    "photos.noLikeOverlay": true


  runBeforeDom: ->
    styles = require "./remove-photo-like-styles"

    styles.use()
