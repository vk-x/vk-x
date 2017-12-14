const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const packageObj = require('../package.json')
const manifestObj = require('../extension/manifest.json')

if (manifestObj.version !== packageObj.version) {
  manifestObj.version = packageObj.version

  const manifestJson = JSON.stringify(manifestObj, null, 2) + '\n'
  fs.writeFileSync(path.resolve(__dirname, '../extension/manifest.json'), manifestJson, { encoding: 'utf8' })

  exec('git add extension/manifest.json')
  exec(`git commit -m \"chore(vk-x): bump manifest version to ${packageObj.version}\"`)

  console.log(`vk-x manifest version bumped to ${packageObj.version}`)
} else {
  console.log(`vk-x manifest version is already ${packageObj.version}`)
}
