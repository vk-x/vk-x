moment = require 'moment'

module.exports =
  init: (format) ->
    format = if format then format else {}
    format.time = if format.time then format.time else 'LT'
    format.date = if format.date then format.date else 'L'
    @_format = format
    return
  format: (now) ->
    m = moment(now)
    result =
      time: m.format(@_format.time)
      date: m.format(@_format.date)
    result