# Bypass away.php, see #3.

utils = require "utils"
settings = require "settings"
cp1251 = require "@vk-x/cp1251"

module.exports =

  defineSettings: ->
    "common.awayPhp":
      defaultValue: true


  run: ->
    # New <a> elements inserted by VK scripts may contain inline onclick handler:
    # `return goAway('url', {}, event);`
    # These elements also have the href set as below, so let's ignore this case
    # and fall through to the next case below.
    utils.setConditional "common.awayPhp", window, "goAway",
      true: ->

    # <a> elements returned from server just have href: "away.php?to=url",
    # where url is uri-encoded.
    $( document ).on "mousedown", "[href^='/away.php'], [href^='away.php']", ->
      if settings.get "common.awayPhp"
        # Save the original href to be able to revert when this feature
        # is disabled in the extension settings.
        $( @ ).attr "vkx-orig-href", $( @ ).attr "href"
        url = $( @ ).attr( "href" ).match( /to=([^&]*)/ )[ 1 ]
        decodedUrl = cp1251.decode url
        $( @ ).attr "href", decodedUrl

    $( document ).on "mousedown", "[vkx-orig-href]", ->
      if not settings.get "common.awayPhp"
        $( @ ).attr "href", $( @ ).attr "vkx-orig-href"
        $( @ ).removeAttr "vkx-orig-href"
