module.exports =

  defineSettings: ->
    "common.previewMediaLinks":
      defaultValue: true


  runBeforeDom: ->
    utils = require "../module-utils"
    utils.styleConditional "common.previewMediaLinks", require "./styles"


  run: ->
    $( document ).on "mousedown", "a[href$='.webm'], a[href$='.gifv'], a[href$='.mp4']", ->
      if $( @ ).next().is "video"
        $( @ ).next().remove()

      else
        $( @ )
          .attr "onclick", "return false"
          .after "<video src='#{@.href}' width='400' autoplay loop onclick='this.parentNode.removeChild(this)'>"
