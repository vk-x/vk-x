# Bypass away.php, see #3.

utils = require "../module-utils"
settings = require "../settings"

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
    window.document.addEventListener "mousedown", ( event ) ->
      element = event.target

      if true is settings.get "common.awayPhp"
        if element.matches "a[href^='/away.php']"
          element.setAttribute "vkx-orig-href", element.href
          href = element.href.match( /to=(.*)/ )[ 1 ]
          cp1251 = require "@vk-x/cp1251"
          decodedHref = cp1251.decode href
          element.href = decodedHref

      else
        if element.getAttribute "vkx-orig-href"
          element.href = element.getAttribute "vkx-orig-href"
