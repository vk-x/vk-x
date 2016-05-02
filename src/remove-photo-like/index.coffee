module.exports =

  defineSettings: ->
    "photos.noLikeOverlay":
      defaultValue: true


  runBeforeDom: ->
    utils = require "../module-utils"
    utils.styleConditional "photos.noLikeOverlay", require "./styles"
