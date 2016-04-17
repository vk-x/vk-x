shortcuts = ( base, baseMethod ) ->

  methodList = require "./method-list"

  addShortcutMethod = ( namespace, methodName ) ->
    base[ namespace ][ methodName ] = ( params, callback ) ->
      baseMethod.call base, "#{namespace}.#{methodName}", params, callback

  for own namespace, list of methodList
    base[ namespace ] = {}

    for methodName in list
      addShortcutMethod namespace, methodName

  # Special case - api method without a namespace.
  base[ "execute" ] = ( params, callback ) ->
    baseMethod.call base, "execute", params, callback


module.exports = shortcuts
