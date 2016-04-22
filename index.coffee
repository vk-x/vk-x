module.exports = ( script, isSource ) ->
  tag = window.document.createElement "script"
  if isSource
    tag.textContent = script
  else
    tag.src = chrome.extension.getURL script
  tag.charset = "UTF-8"
  tag.onload = ->
    this.parentNode.removeChild @
  window.document.head.appendChild tag
