module.exports =

  defineSettings: ->
    "photos.noLikeOverlay":
      defaultValue: true


  runBeforeDom: ->
    utils = require "utils"
    utils.styleConditional "photos.noLikeOverlay", require "./styles"
