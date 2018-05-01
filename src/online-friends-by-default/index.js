import { setPropertyOnSettingChange } from '../module-utils'

export default {
  defineSettings: () => ({
    'friends.onlineByDefault': {
      defaultValue: false
    }
  }),

  run () {
    const friendsLink = document.querySelector('#l_fr > a')
    setPropertyOnSettingChange('friends.onlineByDefault', friendsLink, 'href', {
      true: '/friends?section=online',
      false: friendsLink.href
    })
  }
}
