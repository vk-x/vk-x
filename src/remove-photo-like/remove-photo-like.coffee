module.exports =

  defaultSettings:
    "photos.noLikeOverlay": true


  run: ->
    styles = require "./remove-photo-like-styles"

    styles.use()
