import {
  type Dirs,
  type Version,
  getDirs,
  getVersion
} from '../libs/gpg'

import { log } from '../../../libs/logger'

export interface GPGInfo extends Dirs, Version {
  version: string
}

const getGPGInfo = async (): Promise<GPGInfo> => {
  const gpgVerion = await getVersion()

  const dirs = await getDirs()
  const gpgInfo = { ...gpgVerion, ...dirs }

  Object.keys(gpgInfo).forEach((key) => {
    const val = gpgInfo[key as keyof typeof gpgInfo]
    if (typeof val !== 'string' && val === '') {
      throw new Error(`Invalid GPG ${key} value`, { cause: val })
    }
  })

  const version = `${gpgInfo.gnupg} (libgcrypt ${gpgInfo.libgcrypt})`

  log('---------------- GnuPG info --------------------------------------')
  log(`Version         : ${version}`)
  log(`Libdir          : ${gpgInfo.libdir}`)
  log(`Libexecdir      : ${gpgInfo.libexecdir}`)
  log(`Datadir         : ${gpgInfo.datadir}`)
  log(`Homedir         : ${gpgInfo.homedir}`)

  return {
    ...gpgInfo,
    version
  }
}

export default getGPGInfo
