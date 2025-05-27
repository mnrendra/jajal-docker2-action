import { log } from '../../../libs/logger'

import { getConfig, setConfig } from '../../../libs/git'

export type GitConfigScope =
| 'global'
| 'local'

export type GitPushGpgsign =
| boolean
| 'if-asked'

export interface GitConfigs {
  scope: GitConfigScope
  userSigningkey: string
  commitGpgsign: boolean
  tagGpgsign: boolean
  pushGpgsign: GitPushGpgsign
  userName: string
  userEmail: string
}

export interface GitConfigParams extends Pick<GitConfigs, 'scope'> {
  signUser: boolean
  signCommit: boolean
  signTag: boolean
  signPush: GitPushGpgsign
}

const USER_SIGNINGKEY = 'user.signingkey'
const USER_NAME = 'user.name'
const USER_EMAIL = 'user.email'
const COMMIT_GPGSIGN = 'commit.gpgsign'
const TAG_GPGSIGN = 'tag.gpgsign'
const PUSH_GPGSIGN = 'push.gpgsign'

const configGit = async (
  keyid: string,
  name: string,
  email: string,
  {
    scope,
    signUser,
    signCommit,
    signTag,
    signPush
  }: GitConfigParams
): Promise<GitConfigs> => {
  log('---------------- Configuring Git ---------------------------------')

  const gitConfigs: GitConfigs = {
    scope: 'local',
    userSigningkey: '',
    commitGpgsign: false,
    tagGpgsign: false,
    pushGpgsign: false,
    userName: '',
    userEmail: ''
  }

  gitConfigs.scope = scope
  log(`scope           : ${gitConfigs.scope}`)

  if (signUser) {
    await setConfig(USER_SIGNINGKEY, keyid, scope)
    gitConfigs.userSigningkey = await getConfig(USER_SIGNINGKEY, scope)
    log(`user.signingkey : ${gitConfigs.userSigningkey}`)

    await setConfig(USER_NAME, name, scope)
    gitConfigs.userName = await getConfig(USER_NAME, scope)
    log(`user.name       : ${gitConfigs.userName}`)

    await setConfig(USER_EMAIL, email, scope)
    gitConfigs.userEmail = await getConfig(USER_EMAIL, scope)
    log(`user.email      : ${gitConfigs.userEmail}`)
  }

  if (signCommit) {
    await setConfig(COMMIT_GPGSIGN, signCommit, scope)
    gitConfigs.commitGpgsign = await getConfig(COMMIT_GPGSIGN, scope)
    log(`commit.gpgsign  : ${gitConfigs.commitGpgsign}`)
  }

  if (signTag) {
    await setConfig(TAG_GPGSIGN, signTag, scope)
    gitConfigs.tagGpgsign = await getConfig(TAG_GPGSIGN, scope)
    log(`tag.gpgsign     : ${gitConfigs.tagGpgsign}`)
  }

  if (signPush !== false) {
    await setConfig(PUSH_GPGSIGN, signPush, scope)
    gitConfigs.pushGpgsign = await getConfig(PUSH_GPGSIGN, scope)
    log(`push.gpgsign    : ${gitConfigs.pushGpgsign}`)
  }

  return gitConfigs
}

export default configGit
