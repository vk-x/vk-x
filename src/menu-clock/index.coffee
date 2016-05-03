# Show digital clock in the left menu, see #22.

utils = require "utils"

module.exports =

  defineSettings: ->
    "sideMenu.showTime":
      defaultValue: false


  runBeforeDom: ->
    utils.styleConditional "sideMenu.showTime", require "./styles"


  run: ->
    intervalHandler = null

    utils.runConditional "sideMenu.showTime",
      true: ->
        moment = require "moment"
        clockTemplate = require "./clock-template"

        $( "#side_bar_inner" ).append clockTemplate()

        updateClock = ->
          $( ".vkx-time" ).html moment().format "HH:mm:ss"
          $( ".vkx-date" ).html moment().format "DD.MM.YYYY"

        updateClock()
        intervalHandler = window.setInterval updateClock, 1000

      false: ->
        $( ".vkx-clock" ).remove()
        clearInterval intervalHandler
