const path = require('path')
const fs = require('fs')

const packageObj = require('./package.json')
const manifestObj = require('./extension/manifest.json')

if (manifestObj.version !== packageObj.version) {
  manifestObj.version = packageObj.version

  const manifestJson = JSON.stringify(manifestObj, null, 2) + '\n'
  fs.writeFileSync(path.join('./extension/manifest.json'), manifestJson, { encoding: 'utf8' })

  console.log(`vk-x manifest version bumped to ${packageObj.version}`)
}
