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


for m in modules
  if m.defineSettings
    m._definedKeys = settings.add m.defineSettings()

  m.runBeforeDom? settings.get m._definedKeys


domReady = new Promise ( resolve ) ->
  window.document.addEventListener "DOMContentLoaded", resolve

# Load local settings initially. This is enough to get rolling.
settingsReady = settings.fetchLocal()


Promise.all [ settingsReady, domReady ]
.then ->

  for m in modules
    m.run? settings.get m._definedKeys
