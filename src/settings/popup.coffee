settings = require "../settings"
inject = require "@vk-x/inject"


inject ->
  box = MessageBox
    title: "vk-x"
    grey: true
    width: 700
    hideButtons: true
    selfDestruct: false

  box.bodyNode.id = "vkx-popup"

  document.addEventListener "click", ( event ) ->
    if event.target.matches ".vkx-popup-link"
      TopMenu.toggle off
      stManager.add "settings.css", ->
        box.show()


popupTemplate = require "./popup-template"
popupElement = document.querySelector "#vkx-popup"
popupElement.innerHTML = popupTemplate()


popupElement.addEventListener "click", ( event ) ->
  if event.target.matches ".checkbox"
    key = event.target.getAttribute "setting-id"
    settings.set key, not settings.get key


settings.on "set", ({ key, value }) ->
  settingElement = popupElement.querySelector "[setting-id='#{key}']"
  settingElement.classList.toggle "on", value
