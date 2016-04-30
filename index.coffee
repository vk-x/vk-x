module.exports = ( script, isSource ) ->
  if typeof script is "function"
    script = "(#{script.toString()})()"
    isSource = yes

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
  ( window.document.head or window.document.documentElement).appendChild tag
