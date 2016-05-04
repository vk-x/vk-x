module.exports =

  run: ->
    settings = require "settings"
    packageInfo = require "package.json"

    box = window.MessageBox
      title: "vk-x #{packageInfo.version}"
      grey: true
      width: 720
      hideButtons: true
      selfDestruct: false
      onHide: ->
        settings.saveRemote()


    $( document ).on "click", ".vkx-popup-link", ->
      TopMenu.toggle off
      stManager.add "settings.css", ->
        box.show()


    popupTemplate = require "./popup-template"
    $( box.bodyNode ).html popupTemplate()

    $( "[setting-id]", box.bodyNode ).each ->
      $( @ ).toggleClass "on", settings.get $( @ ).attr "setting-id"


    $( box.bodyNode ).on "click", ".checkbox", ->
      key = $( @ ).attr "setting-id"
      settings.set key, not settings.get key

    $( box.bodyNode ).on "mouseover", ".checkbox", ->
      i18n = require "i18n"
      key = $( @ ).attr "setting-id"
      tooltipMessage = i18n.t "settings.#{key}.tooltip"
      if tooltipMessage
        window.showTooltip @,
          text: tooltipMessage
          shift: [ -20, 8, 8 ]
          dir: "auto"
          slide: 15
          hasover: 1

    $( "#vkx-reset-settings" ).on "click", ->
      settings.reset().then ->
        window.document.location.reload()

    settings.on "set", ({ key, value }) ->
      $( "[setting-id='#{key}']", box.bodyNode ).toggleClass "on", value
