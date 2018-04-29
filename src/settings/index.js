import api from '../api'
import pubsub from 'pubsub-js'

const cache = {}

const settings = {
  on (topic, listener) {
    pubsub.subscribe(`settings.${topic}`, (msg, data) => listener(data))
  },

  trigger (topic, data) {
    pubsub.publish(`settings.${topic}`, data)
  },

  add (newSettings) {
    Object.keys(newSettings).forEach(key => {
      const { defaultValue, onChange } = newSettings[key]
      cache[key] = cache[key] != null ? cache[key] : defaultValue
      if (onChange) {
        this.on(`set.${key}`, onChange)
      }
    })
  },

  async fetchLocal () {
    const parsed = JSON.parse(window.localStorage['vkx-settings'] || '{}')
    Object.keys(parsed).forEach(key => {
      const value = parsed[key]
      if (cache[key] !== value) {
        cache[key] = value
        settings.trigger(`set.${key}`, { key, value })
      }
    })

    settings.trigger('fetch.local')
    return cache
  },

  async saveLocal () {
    window.localStorage['vkx-settings'] = JSON.stringify(cache)
    return cache
  },

  async fetchRemote () {
    await api.ready
    const raw = await api.storage.get({ key: 'settings' })
    const parsed = JSON.parse(raw || '{}')

    Object.keys(parsed).forEach(key => {
      const value = parsed[key]
      if (cache[key] !== value) {
        cache[key] = value
        settings.trigger(`set.${key}`, { key, value })
      }
    })

    settings.trigger('fetch.remote')
  },

  async saveRemote () {
    await api.storage.set({ key: 'settings', value: JSON.stringify(cache) })
  },

  async reset () {
    window.localStorage.removeItem('vkx-settings')
    await api.storage.set({ key: 'settings', value: '' })
  },

  get (keysOrKey) {
    if (Array.isArray(keysOrKey)) {
      return keysOrKey.reduce((acc, key) => {
        acc[key] = cache[key]
        return acc
      }, {})
    } else {
      return cache[keysOrKey]
    }
  },

  async set (key, value) {
    cache[key] = value
    settings.trigger(`set.${key}`, { key, value })

    await this.saveLocal()
  }
}

export default settings
