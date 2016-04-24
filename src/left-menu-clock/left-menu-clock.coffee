settings =
  show: true
  showTime: true
  showDate: true
  format:
    time: "HH:mm:ss"
    date: "DD.MM.YYYY"
  useNtp: false
  ntp:
    url: "ntp2.stratum2.ru"
    reSyncInterval: 600

if settings.show
  timeProvider = {}
  if settings.useNtp
    timeProvider = require "./provider-server"
    timeProvider.init settings.ntp
  else
    timeProvider = require "./provider-local"
    timeProvider.init()

  timeFormatter = require "./formatter-moment"
  timeFormatter.init settings.format

  timeRenderer = require "./renderer-digital"
  timeRenderer.init settings

  updateClock = ->
    now = timeProvider.getTime()
    strings = timeFormatter.format(now)
    timeRenderer.update strings
    return

  updateClock()
  initTime = timeProvider.getTime()
  delay = 1000 - initTime.getMilliseconds()
  window.setTimeout (->
    updateClock()
    updateInterval = window.setInterval(updateClock, 1000)
    return
  ), delay