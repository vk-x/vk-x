settings = require "../settings"

box = MessageBox
  title: "vk-x"
  grey: true
  width: 700
  hideButtons: true
  selfDestruct: false
  onHide: ->
    settings.saveRemote()


document.addEventListener "click", ( event ) ->
  if event.target.matches ".vkx-popup-link"
    TopMenu.toggle off
    stManager.add "settings.css", ->
      box.show()


popupTemplate = require "./popup-template"
box.bodyNode.innerHTML = popupTemplate()


box.bodyNode.addEventListener "click", ( event ) ->
  if event.target.matches ".checkbox"
    key = event.target.getAttribute "setting-id"
    settings.set key, not settings.get key


settings.on "set", ({ key, value }) ->
  settingElement = box.bodyNode.querySelector "[setting-id='#{key}']"
  settingElement.classList.toggle "on", value
