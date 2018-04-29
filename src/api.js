import postRobot from 'post-robot'
import vk from '../vk-api/src/index'

postRobot.CONFIG.LOG_LEVEL = 'warn'
postRobot.CONFIG.ALLOW_SAME_WINDOW = true

vk.ready = postRobot.send(window, 'vkxConfirmApiReady')

vk.method = async (...args) => {
  const result = await postRobot.send(window, 'vkxCallApiMethod', { args })
  return result.data
}

export default vk
