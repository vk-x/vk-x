settings = require "./settings"


modules = [
  require "./away-php"
  require "./fixed-left-menu"
  require "./hide-people-you-might-know"
  require "./no-link-previews"
  require "./remove-photo-like"
  require "./menu-clock"
  require "./message-background"
  require "./settings/menu-item"
  require "./settings/popup"
]


settingsReady = settings.fetchLocal()
.then ->
  for m in modules
    if m.defineSettings
      m._definedKeys = settings.add m.defineSettings()

    m.runBeforeDom? settings.get m._definedKeys


domReady = new Promise ( resolve ) ->
  window.document.addEventListener "DOMContentLoaded", resolve

# Local settings are fetched faster than the DOM with a high level of certainty,
# but it's still not guaranteed that they'll be ready before the DOM.
# So we need to wait for both here to be sure, not only for DOM.
Promise.all [ settingsReady, domReady ]
.then ->

  for m in modules
    m.run? settings.get m._definedKeys


# Fetching remote settings is slower than local, but is also not guaranteed
# to be that way.
# TODO: ensure that this isn't overwritten by local settings.
settings.fetchRemote()
