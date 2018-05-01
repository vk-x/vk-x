import settings from './settings'

export const onSettingChange = (settingKey, valueHandlers) => {
  const initialValueHandler = valueHandlers[settings.get(settingKey)]
  initialValueHandler && initialValueHandler()

  settings.on(`set.${settingKey}`, ({ value }) => {
    valueHandlers[value] && valueHandlers[value]()
  })
}

export const wrapStyle = style => {
  style.isUsed = false

  style.use = () => {
    if (!style.isUsed) {
      style.ref()
      style.isUsed = true
    }
  }

  style.unuse = () => {
    if (style.isUsed) {
      style.unref()
      style.isUsed = false
    }
  }

  return style
}

export const applyStyleWhenSettingIsTrue = (settingKey, style) => {
  const wrapped = wrapStyle(style)

  onSettingChange(settingKey, {
    true: () => { wrapped.use() },
    false: () => { wrapped.unuse() }
  })
}

export const setPropertyOnSettingChange = (settingKey, obj, key, values) => {
  obj[key] = values[settings.get(settingKey)]

  settings.on(`set.${settingKey}`, ({ value }) => {
    obj[key] = values[value]
  })
}
