settings = require "./settings"


modules = [
  require "./away-php"
  require "./fixed-left-menu/fixed-left-menu"
  require "./no-link-previews/no-link-previews"
  require "./menu-clock/menu-clock"
  require "./settings/menu-item"
  require "./settings/popup"
]


for m in modules
  if m.defaultSettings
    settings.add m.defaultSettings


domReady = new Promise ( resolve ) ->
  window.document.addEventListener "DOMContentLoaded", resolve

# Load local settings initially. This is enough to get rolling.
settingsReady = settings.fetchLocal()


Promise.all [ settingsReady, domReady ]
.then ->

  for m in modules
    m.run()
