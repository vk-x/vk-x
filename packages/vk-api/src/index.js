import vk from './vk'
import shortcuts from './shortcuts'

shortcuts(vk, vk.method, require('./method-list.json'))
shortcuts(vk, vk.clientMethod, require('./client-method-list.json'))
// Special case, too lazy to parse this correctly into method-list.
shortcuts(vk, vk.method, {'execute': true})

export default vk
