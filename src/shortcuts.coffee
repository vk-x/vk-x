shortcuts = ( base, baseMethod, methodList ) ->

  addShortcutMethod = ( target, name, fullName ) ->
    target[ name ] = ( args... ) ->
      args.unshift fullName
      baseMethod.apply base, args


  for own namespace, list of methodList
    if list is true
      addShortcutMethod base, namespace, namespace

    else
      base[ namespace ] = {}
      for methodName in list
        addShortcutMethod base[ namespace ], methodName, "#{namespace}.#{methodName}"


module.exports = shortcuts
