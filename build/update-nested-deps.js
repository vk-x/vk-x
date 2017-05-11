const path = require('path')
const fs = require('fs')

const getFolders = () => fs.readdirSync('packages').map(f => path.join('packages', f)).filter(f => fs.statSync(f).isDirectory())
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const getPackage = folder => ({ folder, config: readJson(path.join(folder, 'package.json')) })
const getPackages = () => getFolders().map(folder => getPackage(folder))

const getRootConfig = () => require('./package.json')
const rootDeps = Object.assign({}, getRootConfig().devDependencies || {}, getRootConfig().dependencies || {})

const updateObjectDeps = (obj = {}) => {
  for (let key in obj) {
    if (key in rootDeps && rootDeps[key] !== obj[key]) {
      console.log(`    - ${key} from "${obj[key]}" to "${rootDeps[key]}"`)
      obj[key] = rootDeps[key]
    }
  }
}
const updateDeps = ({ config }) => {
  updateObjectDeps(config.dependencies)
  updateObjectDeps(config.devDependencies)
}

const toJson = config => JSON.stringify(config, null, 2) + '\n'
const savePackage = pkg => fs.writeFileSync(path.join(pkg.folder, 'package.json'), toJson(pkg.config), { encoding: 'utf8' })

/**
 * Updates all deps of monorepo packages to have the same versions as the root `package.json`.
 */
const syncAll = () => {
  getPackages().forEach(pkg => {
    console.log(`Updating ${pkg.folder}...`)
    updateDeps(pkg)
    savePackage(pkg)
  })
}

module.exports = { syncAll }
