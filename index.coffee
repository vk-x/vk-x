module.exports = ( script, isSource ) ->
  tag = window.document.createElement "script"

  if isSource
    tag.textContent = script
    setTimeout ->
      tag.parentNode.removeChild tag

  else
    tag.src = chrome.extension.getURL script
    tag.onload = ->
      tag.parentNode.removeChild tag

  tag.charset = "UTF-8"
  window.document.head.appendChild tag
