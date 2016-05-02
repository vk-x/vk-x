# Show digital clock in the left menu, see #22.

utils = require "../module-utils"

module.exports =

  defineSettings: ->
    "sideMenu.showTime":
      defaultValue: true


  runBeforeDom: ->
    utils.styleConditional "sideMenu.showTime", require "./styles"


  run: ->
    intervalHandler = null

    utils.runConditional "sideMenu.showTime",
      true: ->
        moment = require "moment"

        leftMenu = document.querySelector "#side_bar_inner"
        leftMenu.insertAdjacentHTML "beforeend", "
          <div class='vkx-clock'>
            <div class='vkx-time'></div>
            <div class='vkx-date'></div>
          </div>"

        updateClock = ->
          document.querySelector( ".vkx-time" ).innerHTML = moment().format "HH:mm:ss"
          document.querySelector( ".vkx-date" ).innerHTML = moment().format "DD.MM.YYYY"

        updateClock()
        intervalHandler = window.setInterval updateClock, 1000

      false: ->
        clock = document.querySelector ".vkx-clock"
        clock?.remove()

        if intervalHandler
          clearInterval intervalHandler
