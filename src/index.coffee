vk = require "./vk"
shortcuts = require "./shortcuts"

shortcuts vk, vk.method, require "./method-list"
shortcuts vk, vk.clientMethod, require "./client-method-list"
# Special case, too lazy to parse this correctly into method-list.
shortcuts vk, vk.method, "execute": true

module.exports = vk
