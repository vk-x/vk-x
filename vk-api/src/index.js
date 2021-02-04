import vk from './vk'
import shortcuts from './shortcuts'
import methodList from './method-list.json'
import clientMethodList from './client-method-list.json'

shortcuts(vk, 'method', methodList)
shortcuts(vk, 'clientMethod', clientMethodList)
// Special case, too lazy to parse this correctly into method-list.
shortcuts(vk, 'method', { execute: true })

export default vk
