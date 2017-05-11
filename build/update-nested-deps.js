const path = require('path')
const fs = require('fs')

const ROOT = path.resolve(__dirname, '..')
const PACKAGES = path.join(ROOT, 'packages')

const getFolders = () => fs.readdirSync(PACKAGES).map(f => path.join(PACKAGES, f)).filter(f => fs.statSync(f).isDirectory())
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const getPackage = folder => ({ folder, config: readJson(path.join(folder, 'package.json')), isChanged: false })
const getPackages = () => getFolders().map(folder => getPackage(folder))

const getRootConfig = () => readJson(path.join(ROOT, 'package.json'))
const rootDeps = Object.assign({}, getRootConfig().devDependencies || {}, getRootConfig().dependencies || {})

const updateObjectDeps = (obj = {}) => {
  let isChanged = false
  for (let key in obj) {
    if (key in rootDeps && rootDeps[key] !== obj[key]) {
      console.log(`    - ${key} from "${obj[key]}" to "${rootDeps[key]}"`)
      obj[key] = rootDeps[key]
      isChanged = true
    }
  }
  return isChanged
}
const updateDeps = (pkg) => {
  let isChanged = false
  isChanged = updateObjectDeps(pkg.config.dependencies) || isChanged
  isChanged = updateObjectDeps(pkg.config.devDependencies) || isChanged
  pkg.isChanged = isChanged
  return isChanged
}

const toJson = config => JSON.stringify(config, null, 2) + '\n'
const savePackage = pkg => fs.writeFileSync(path.join(pkg.folder, 'package.json'), toJson(pkg.config), { encoding: 'utf8' })

/**
 * Updates all deps of monorepo packages to have the same versions as the root `package.json`.
 */
const syncAll = () => {
  const pkgs = getPackages()
  pkgs.forEach(pkg => {
    console.log(`Updating ${pkg.folder}...`)
    updateDeps(pkg)
    savePackage(pkg)
  })
  return pkgs.filter(p => p.isChanged)
}

module.exports = { syncAll }
