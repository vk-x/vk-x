import $ from 'jquery'
import utils from 'utils'

export default {
  defineSettings: () => ({
    'videos.myVideosByDefault': {
      defaultValue: false
    }
  }),

  run () {
    const videosLink = $('#l_vid > a')[ 0 ]
    utils.setConditional('videos.myVideosByDefault', videosLink, 'href', {
      true: `/videos${window.vk.id}`
    })
  }
}
