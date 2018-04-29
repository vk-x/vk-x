const shortcuts = (base, baseMethod, methodList) => {
  const addShortcutMethod = (target, name, fullName) => {
    target[name] = (...args) => {
      args.unshift(fullName)
      return base[baseMethod].apply(base, args)
    }
  }

  Object.keys(methodList).forEach(namespace => {
    const list = methodList[namespace]
    if (list === true) {
      addShortcutMethod(base, namespace, namespace)
    } else {
      base[namespace] = {}
      list.forEach(methodName =>
        addShortcutMethod(base[namespace], methodName, `${namespace}.${methodName}`))
    }
  })
}

export default shortcuts
