// Version-bumps and publishes every package with lerna: `yarn publish:<bump>`.
//
// npm auth is verified BEFORE `lerna version`, which commits, tags and pushes. A
// missing or expired token used to fail only at publish time, leaving a pushed but
// unpublished version behind. If npm isn't authenticated and NPM_TOKEN_OP_REF is set,
// the token is read from 1Password into NPM_TOKEN for this process only (`op read`,
// with `--account $NPM_TOKEN_OP_ACCOUNT` when set); ~/.npmrc must use ${NPM_TOKEN}.
import {execFileSync, spawnSync} from 'node:child_process'

const bumps = ['prerelease', 'patch', 'minor', 'major']
const bump = process.argv[2]
if (!bumps.includes(bump)) fail(`usage: node scripts/publish.js <${bumps.join('|')}>`)

if (!npmUser() && process.env.NPM_TOKEN_OP_REF) process.env.NPM_TOKEN = readTokenFrom1Password()
const user = npmUser()
if (!user) fail('npm is not authenticated (npm whoami failed), so nothing was versioned or pushed. ' +
  'Set NPM_TOKEN_OP_REF to the 1Password reference of the npm token, or export a valid NPM_TOKEN.')
console.log(`npm: publishing as ${user}`)

// literal 'lerna' in each call so knip sees the binary in use
exitOnFailure(spawnSync('lerna', ['version', bump, '--force-publish', '--exact', '--git-tag-version', '--push', '--yes'], {stdio: 'inherit'}))
exitOnFailure(spawnSync('lerna', ['publish', 'from-git', '--yes'], {stdio: 'inherit'}))

function npmUser() {
  const {status, stdout} = spawnSync('npm', ['whoami'], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']})
  return status === 0 ? stdout.trim() : undefined
}

function readTokenFrom1Password() {
  const account = process.env.NPM_TOKEN_OP_ACCOUNT
  const args = ['read', process.env.NPM_TOKEN_OP_REF, ...(account ? ['--account', account] : [])]
  try {
    return execFileSync('op', args, {encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit']}).trim()
  } catch (e) {
    fail(`could not read the npm token from 1Password: ${e.message}`)
  }
}

function exitOnFailure({status}) {
  if (status !== 0) process.exit(status ?? 1)
}

function fail(message) {
  console.error(message)
  process.exit(1)
}
