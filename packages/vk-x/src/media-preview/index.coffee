utils = require "../module-utils"


module.exports =

  defineSettings: ->
    "common.previewMediaLinks":
      defaultValue: true


  runBeforeDom: ->
    utils.styleConditional "common.previewMediaLinks", require "./styles"


  run: ->
    handler = ( event ) ->
      $( @ ).attr "vkx-media-link", ""

      # Allow to open the link normally with Ctrl.
      if event.ctrlKey
        return $( @ ).removeAttr "onclick"

      # Prevent bubbling otherwise.
      $( @ ).attr "onclick", "return false"

      if $( @ ).children().last().is "video"
        $( @ )
          .removeClass "vkx-expanded"
          .children().last().remove()
      else
        $( @ )
          .addClass "vkx-expanded"
          .append "<video
            vkx-media-expanded
            src='#{@.href}'
            autoplay
            loop
            width='400'
            onclick='if (!arguments[0].ctrlKey) this.parentNode.removeChild(this)'
          >"

    selector = "a[href$='.webm'], a[href$='.gifv'], a[href$='.mp4'], a[href^='/away.php'][href*='.webm&'], a[href^='/away.php'][href*='.gifv&'], a[href^='/away.php'][href*='.mp4&']"

    utils.runConditional "common.previewMediaLinks",
      true: ->
        $( document ).on "mousedown", selector, handler
      false: ->
        $( document ).off "mousedown", selector, handler
        $( "[vkx-media-link]" )
          .removeAttr "onclick"
          .removeAttr "vkx-media-link"
          .removeClass "vkx-expanded"
        $( "[vkx-media-expanded]" ).remove()
