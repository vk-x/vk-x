settings = require "./settings"


modules = [
  require "./away-php"
  require "./fixed-left-menu/fixed-left-menu"
  require "./hide-people-you-might-know/hide-people-you-might-know"
  require "./no-link-previews/no-link-previews"
  require "./remove-photo-like/remove-photo-like"
  require "./menu-clock/menu-clock"
  require "./message-background/message-background"
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
