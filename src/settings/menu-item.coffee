settings = require "settings"
utils = require "utils"

module.exports =

  defineSettings: ->
    "internal.isNew":
      defaultValue: true

  run: ->
    $( "#top_support_link" ).after "<a class='top_profile_mrow vkx-popup-link'>vk-x</a>"

    # Wait for sync down. Otherwise isNew will be true on a new machine when it shouldn't be.
    settings.on "fetch.remote", ->

      utils.runConditional "internal.isNew",
        true: -> TopMenu.show()

      utils.styleConditional "internal.isNew", require "./just-installed"

      $( ".vkx-popup-link" ).on "click", ->
        settings.set "internal.isNew", false
