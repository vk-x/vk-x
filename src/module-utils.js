import settings from './settings'

export default {
  runConditional (settingKey, functions) {
    const currentValueHandler = functions[settings.get(settingKey)]
    currentValueHandler && currentValueHandler()

    settings.on(`set.${settingKey}`, ({ value }) => {
      functions[value] && functions[value]()
    })
  },

  wrapStyle (style) {
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
  },

  styleConditional (settingKey, style) {
    const wrapped = this.wrapStyle(style)

    this.runConditional(settingKey, {
      true: () => { wrapped.use() },
      false: () => { wrapped.unuse() }
    })
  },

  setConditional (settingKey, obj, key, values) {
    const initialValue = obj[key]

    const newValue = values[settings.get(settingKey)]
    obj[key] = newValue != null ? newValue : initialValue

    settings.on(`set.${settingKey}`, ({ value }) => {
      obj[key] = values[value] != null ? values[value] : initialValue
    })
  }
}
