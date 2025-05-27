import type { TrustLevel } from './libs/gpg'
import type { PrivateKeyInfo } from './libs/openpgp'

import { cwd } from 'node:process'

import { debug, log, success, warn } from '../../libs/logger'

import gpg from './libs/gpg'

import {
  type GitConfigScope,
  type GitPushGpgsign,
  type GPGInfo,
  type Options,
  configGit,
  configGPGAgent,
  getGPGInfo,
  getPrivateKeyInfo,
  importGPGKey,
  printFingerprint,
  restoreDir,
  setGPGTrustLevel,
  setWorkdir,
  validateOptions
} from './utils'

export type {
  Options
}

export interface Outputs extends
  GPGInfo,
  Omit<PrivateKeyInfo, 'id' | 'digest'> {
  // PrivateKeyInfo
  digest: string
  keyid: string
  fingerprint: string
  // ImportGPG
  log: string
  // ConfigureGPGAgent
  gpgHome: string
  keygrips: string[]
  // SetTrustLevel
  trustLevel?: TrustLevel
  // ConfigureGit
  gitConfigScope: GitConfigScope
  gitUserSigningkey: string
  gitCommitGpgsign: boolean
  gitTagGpgsign: boolean
  gitPushGpgsign: GitPushGpgsign
  gitUserName: string
  gitUserEmail: string
  workdir: string
}

export const importGPG = async (
  privateKey: string,
  options: Options = {}
): Promise<Outputs> => {
  try {
    if (typeof privateKey !== 'string' || privateKey === '') {
      throw new Error('Invalid GnuPG private key', { cause: privateKey })
    }

    const opt = validateOptions(options)

    const { workdir, fingerprint, passphrase, trustLevel } = opt

    await setWorkdir(workdir)

    const gpg = await getGPGInfo()

    const key = await getPrivateKeyInfo(privateKey)

    const { digest, id, name, email } = key

    printFingerprint(digest, fingerprint)

    const log = await importGPGKey(privateKey)

    const agent = await configGPGAgent(digest, fingerprint, passphrase)

    await setGPGTrustLevel(id, trustLevel)

    success('---------------- Successfully set up GPG key ---------------------')

    const gitOptions = {
      scope: opt.gitScope,
      signUser: opt.gitSignUser,
      signCommit: opt.gitSignCommit,
      signTag: opt.gitSignTag,
      signPush: opt.gitSignPush
    }

    const gitConfigs = await configGit(id, name, email, gitOptions)

    success('---------------- Successfully configured Git ---------------------')

    const outputs: Outputs = {
      ...gpg,
      ...key,
      ...agent,
      ...gitConfigs,
      keyid: id,
      fingerprint: fingerprint ?? digest,
      log,
      trustLevel,
      gitConfigScope: gitConfigs.scope,
      gitUserSigningkey: gitConfigs.userSigningkey,
      gitUserName: gitConfigs.userName,
      gitUserEmail: gitConfigs.userEmail,
      gitCommitGpgsign: gitConfigs.commitGpgsign,
      gitTagGpgsign: gitConfigs.tagGpgsign,
      gitPushGpgsign: gitConfigs.pushGpgsign,
      workdir: cwd()
    }

    restoreDir()

    return outputs
  } catch (error) {
    restoreDir()
    if (error instanceof Error) throw error
    throw new Error('Unknown error', { cause: error })
  }
}

export const cleanupGPG = async (
  fingerprint: string = ''
): Promise<void> => {
  if (fingerprint.length <= 0) {
    debug('Primary key fingerprint is not defined. Skipping cleanup.')
    return
  }

  try {
    log('---------------- Cleaning up GPG key -----------------------------')

    log(`Removing key ${fingerprint}`)
    await gpg.deleteKey(fingerprint)

    log('Killing GnuPG agent')
    await gpg.killAgent()

    success('---------------- Successfully cleaned up GPG key -----------------')
  } catch (error) {
    const warnMsg = error instanceof Error ? error.message : 'Unknown error'
    warn(warnMsg)
    warn(`${error as any}`)
  }
}
