const { syncAll } = require('./update-nested-deps')
const path = require('path')
const git = require('simple-git')(path.resolve(__dirname, '..'))

const gitOutputHandler = (command, stdout, stderr) => {
  stdout.pipe(process.stdout)
  stderr.pipe(process.stderr)
}

const GH_TOKEN = process.env.GH_TOKEN
const BRANCH = process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH || ''
const REPO = process.env.TRAVIS_REPO_SLUG

console.log('Current branch is:', BRANCH || '(empty)')
if (!BRANCH.startsWith('greenkeeper/')) {
  console.log('Not a Greenkeeper PR, exiting.')
  process.exit(0)
}

const changedPackages = syncAll()

git
  .outputHandler(gitOutputHandler)
  .addConfig('user.email', 'travis@travis-ci.org')
  .addConfig('user.name', 'Travis CI')
  .checkout(BRANCH)
  .add(changedPackages.map(p => path.join(p.folder, 'package.json')))
  .commit('chore(package): update nested deps')
  .addRemote('gh-repo', `https://${GH_TOKEN}@github.com/${REPO}.git`)
  .push('gh-repo', BRANCH, ['--set-upstream'])
