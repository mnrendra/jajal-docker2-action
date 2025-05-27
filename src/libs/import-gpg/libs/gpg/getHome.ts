import { existsSync, mkdirSync } from 'node:fs'

import getHomeDir from './getHomeDir'

const getHome = async (): Promise<string> => {
  const homedir = await getHomeDir()

  if (homedir.length === 0) {
    throw new Error('Unable to determine GnuPG home directory', { cause: homedir })
  }

  if (!existsSync(homedir)) {
    mkdirSync(homedir, { recursive: true })
  }

  return homedir
}

export default getHome
