shortcuts = ( base, baseMethod, methodList ) ->

  addShortcutMethod = ( target, name, fullName ) ->
    target[ name ] = ( params, callback ) ->
      baseMethod.call base, fullName, params, callback


  for own namespace, list of methodList
    if list is true
      addShortcutMethod base, namespace, namespace

    else
      base[ namespace ] = {}
      for methodName in list
        addShortcutMethod base[ namespace ], methodName, "#{namespace}.#{methodName}"


module.exports = shortcuts
