import { platform } from 'node:os'
import { join } from 'node:path'
import { env } from 'node:process'

import { GNUPG_EXT, PLATFORM } from './consts'

import getDirs from './getDirs'

const getHomeDir = async (): Promise<string> => {
  const { GNUPGHOME, HOME, USERPROFILE } = env

  if (typeof GNUPGHOME === 'string' && GNUPGHOME !== '') {
    return GNUPGHOME
  }

  if (typeof HOME === 'string' && HOME !== '') {
    return join(HOME, GNUPG_EXT)
  }

  if (typeof USERPROFILE === 'string' && USERPROFILE !== '' && platform() === PLATFORM.WIN32) {
    return join(USERPROFILE, GNUPG_EXT)
  }

  const { homedir } = await getDirs()

  return homedir
}

export default getHomeDir
