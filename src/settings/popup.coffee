module.exports =

  run: ->
    settings = require "settings"
    packageInfo = require "package.json"

    box = window.MessageBox
      title: "vk-x #{packageInfo.version}"
      grey: true
      width: 700
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


    settings.on "set", ({ key, value }) ->
      $( "[setting-id='#{key}']", box.bodyNode ).toggleClass "on", value
