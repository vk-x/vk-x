settings = require "./settings"


modules = [
  require "./away-php"
  require "./fixed-left-menu"
  require "./hide-people-you-might-know"
  require "./menu-clock"
  require "./message-background"
  require "./no-link-previews"
  require "./remove-photo-like"
  require "./settings/menu-item"
  require "./settings/popup"
]


settingsReady = settings.fetchLocal()
.then ->
  for m in modules
    if m.defineSettings
      m._definedKeys = settings.add m.defineSettings()

    m.runBeforeDom? settings.get m._definedKeys

  # Defer this to not do too much at the same time and freeze the browser.
  setTimeout ->
    require "./i18n/en"
    require "./i18n/ru"


domReady = new Promise ( resolve ) ->
  window.document.addEventListener "DOMContentLoaded", resolve

# Local settings are fetched faster than the DOM with a high level of certainty,
# but it's still not guaranteed that they'll be ready before the DOM.
# So we need to wait for both here to be sure, not only for DOM.
Promise.all [ settingsReady, domReady ]
.then ->

  for m in modules
    m.run? settings.get m._definedKeys

  # Start fetching remote settings after the DOM is ready so the page
  # doesn't load slower.
  settings.fetchRemote()
  .then ->
    settings.saveLocal()
