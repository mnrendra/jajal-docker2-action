import type { TrustLevel } from '../libs/gpg'

import type { GitConfigParams, GitConfigScope, GitPushGpgsign } from './configGit'

import { log } from '../../logger'

import { store, setStore } from '../store'

import { isDir } from '../helpers'

const validateWorkdir = (
  workdir: string = '.'
): string => {
  if (typeof workdir !== 'string' || workdir === '') {
    throw new Error('Invalid workdir value', { cause: workdir })
  }

  if (!isDir(workdir)) {
    throw new Error(`workdir ${workdir} is doesn't exist`, { cause: workdir })
  }

  return workdir
}

const validatePassphrase = (
  passphrase?: string
): string | undefined => {
  if (passphrase === undefined) return

  if (typeof passphrase !== 'string' || passphrase === '') {
    throw new Error('Invalid passphrase value', { cause: passphrase })
  }

  return passphrase
}

const validateFingerprint = (
  fingerprint?: string
): string | undefined => {
  if (fingerprint === undefined) return

  if (typeof fingerprint !== 'string' || fingerprint === '') {
    throw new Error('Invalid fingerprint value', { cause: fingerprint })
  }

  return fingerprint
}

const validateTrustLevel = (
  trustLevel?: TrustLevel
): TrustLevel | undefined => {
  if (trustLevel === undefined) return

  const level = Number(trustLevel)

  if ((Number.isNaN(level) || level < 1 || level > 5)) {
    throw new Error('Invalid trustLevel value', { cause: trustLevel })
  }

  return trustLevel
}

const validateGitScope = (
  gitScope: GitConfigScope = 'local'
): GitConfigScope => {
  if (
    typeof gitScope !== 'string' ||
    !['global', 'local'].includes(gitScope)
  ) {
    throw new Error('Invalid gitScope value', { cause: gitScope })
  }

  return gitScope
}

const validateGitSignUser = (
  gitSignUser: boolean = true
): boolean => {
  if (typeof gitSignUser !== 'boolean') {
    throw new Error('Invalid gitSignUser value', { cause: gitSignUser })
  }

  return gitSignUser
}

const validateGitSignCommit = (
  gitSignCommit: boolean = false
): boolean => {
  if (typeof gitSignCommit !== 'boolean') {
    throw new Error('Invalid gitSignCommit value', { cause: gitSignCommit })
  }

  return gitSignCommit
}

const validateGitSignTag = (
  gitSignTag: boolean = false
): boolean => {
  if (typeof gitSignTag !== 'boolean') {
    throw new Error('Invalid gitSignTag value', { cause: gitSignTag })
  }

  return gitSignTag
}

const validateGitSignPush = (
  gitSignPush: GitPushGpgsign = false
): GitPushGpgsign => {
  if (
    typeof gitSignPush !== 'boolean' &&
    (typeof gitSignPush !== 'string' || gitSignPush !== 'if-asked')
  ) {
    throw new Error('Invalid gitSignPush value', { cause: gitSignPush })
  }

  return gitSignPush
}

const validateVerbose = (
  verbose: boolean = false
): boolean => {
  if (typeof verbose !== 'boolean') {
    throw new Error('Invalid verbose value', { cause: verbose })
  }

  return verbose
}

type GitConfigOptions = {
  [K in keyof GitConfigParams as `git${Capitalize<K>}`]?: GitConfigParams[K]
}

export interface Options extends GitConfigOptions {
  workdir?: string
  passphrase?: string
  fingerprint?: string
  trustLevel?: TrustLevel
  verbose?: boolean
}

interface ValidOptions extends
  Omit<Options, keyof GitConfigOptions>,
  Required<GitConfigOptions> {
  workdir: string
  verbose: boolean
}

const validateOptions = (
  opt: Options
): ValidOptions => {
  if (typeof opt !== 'object' || opt === null || Array.isArray(opt)) {
    throw new Error('Invalid options value', { cause: opt })
  }

  const workdir = validateWorkdir(opt.workdir)
  const passphrase = validatePassphrase(opt.passphrase)
  const fingerprint = validateFingerprint(opt.fingerprint)
  const trustLevel = validateTrustLevel(opt.trustLevel)
  const gitScope = validateGitScope(opt.gitScope)
  const gitSignUser = validateGitSignUser(opt.gitSignUser)
  const gitSignCommit = validateGitSignCommit(opt.gitSignCommit)
  const gitSignTag = validateGitSignTag(opt.gitSignTag)
  const gitSignPush = validateGitSignPush(opt.gitSignPush)
  const verbose = validateVerbose(opt.verbose)

  setStore({ ...store, verbose })

  log('---------------- importGPG\'s options to use ---------------------')
  log(`workdir         : ${workdir}`)
  log(`passphrase      : ${passphrase}`)
  log(`fingerprint     : ${fingerprint}`)
  log(`trustLevel      : ${trustLevel}`)
  log(`gitScope        : ${gitScope}`)
  log(`gitSignUser     : ${gitSignUser}`)
  log(`gitSignCommit   : ${gitSignCommit}`)
  log(`gitSignTag      : ${gitSignTag}`)
  log(`gitSignPush     : ${gitSignPush}`)
  log(`verbose         : ${verbose}`)

  return {
    workdir,
    passphrase,
    fingerprint,
    trustLevel,
    gitScope,
    gitSignUser,
    gitSignCommit,
    gitSignTag,
    gitSignPush,
    verbose
  }
}

export default validateOptions
