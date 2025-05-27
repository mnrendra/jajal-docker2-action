import { chdir, cwd } from 'node:process'

import { log } from '../../../libs/logger'

import { store } from '../store'

const restoreDir = (): void => {
  const currentWorkdir = cwd()

  const storedWorkdir = store.cwd

  if (currentWorkdir !== storedWorkdir) {
    log('---------------- Restore working directory -----------------------')

    chdir(storedWorkdir)
    log(`Restore working directory to ${storedWorkdir}.`)
  }
}

export default restoreDir
