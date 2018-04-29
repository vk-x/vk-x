import utils from '../module-utils'

export default {
  defineSettings: () => ({
    'videos.myVideosByDefault': {
      defaultValue: false
    }
  }),

  run () {
    const videosLink = document.querySelector('#l_vid > a')
    utils.setConditional('videos.myVideosByDefault', videosLink, 'href', {
      true: `/videos${window.vk.id}`
    })
  }
}
