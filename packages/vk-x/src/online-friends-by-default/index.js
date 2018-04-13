import $ from 'jquery'
import utils from 'utils'

export default {
  defineSettings: () => ({
    'friends.onlineByDefault': {
      defaultValue: false
    }
  }),

  run () {
    const friendsLink = $('#l_fr > a')[0]
    utils.setConditional('friends.onlineByDefault', friendsLink, 'href', {
      true: '/friends?section=online'
    })
  }
}
