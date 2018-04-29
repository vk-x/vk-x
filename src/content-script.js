import postRobot from 'post-robot'
import vk from '../vk-api/src/index'
import { inject } from './helpers/inject'

// Compiled from src/index.js, see webpack.config.js
inject('injected.js')

const apiReady = vk.authWebsite('5419677')

postRobot.CONFIG.LOG_LEVEL = 'warn'
postRobot.CONFIG.ALLOW_SAME_WINDOW = true

postRobot.on('vkxConfirmApiReady', async () => {
  await apiReady
  return true
})

postRobot.on('vkxCallApiMethod', ({ data }) => vk.method(...data.args))
