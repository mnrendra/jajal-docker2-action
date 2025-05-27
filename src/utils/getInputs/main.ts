import type {
  Options
} from './types'

import {
  getFingerprint,
  getGitScope,
  getGitSignCommit,
  getGitSignPush,
  getGitSignTag,
  getGitSignUser,
  getPassphrase,
  getPrivateKey,
  getToken,
  getTrustLevel,
  getWorkdir
} from './utils'

interface Inputs extends Options {
  workdir: string
  privateKey?: string
  token?: string
}

const main = (): Inputs => {
  const fingerprint = getFingerprint()
  const gitScope = getGitScope()
  const gitSignCommit = getGitSignCommit()
  const gitSignPush = getGitSignPush()
  const gitSignTag = getGitSignTag()
  const gitSignUser = getGitSignUser()
  const passphrase = getPassphrase()
  const privateKey = getPrivateKey()
  const token = getToken()
  const trustLevel = getTrustLevel()
  const workdir = getWorkdir()

  return {
    fingerprint,
    gitScope,
    gitSignCommit,
    gitSignPush,
    gitSignTag,
    gitSignUser,
    passphrase,
    privateKey,
    token,
    trustLevel,
    workdir
  }
}

export default main
