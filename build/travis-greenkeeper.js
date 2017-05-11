const childProcess = require('child_process')
const { syncAll } = require('./update-nested-deps')

const BRANCH = process.env.TRAVIS_PULL_REQUEST_BRANCH || ''
const REPO = process.env.TRAVIS_REPO_SLUG

if (!BRANCH.startsWith('greenkeeper/')) {
  console.log('Not a Greenkeeper PR, exiting.')
  process.exit(0)
}

syncAll()

const run = command => childProcess.spawnSync(command)

run('git config --global user.email "travis@travis-ci.org"')
run('git config --global user.name "Travis CI"')

run('git add */package.json')
run('git commit -m "chore(package): update nested deps"')

// eslint-disable-next-line no-template-curly-in-string
// Silence this line to avoid revealing the secret token.
run(`git remote add gh-repo https://\${GH_TOKEN}@github.com/${REPO}.git > /dev/null 2>&1`)
run(`git push --set-upstream gh-repo ${BRANCH}`)
