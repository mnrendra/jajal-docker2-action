import { resolve } from 'node:path'
import { chdir, cwd } from 'node:process'

import { log } from '../../../libs/logger'

import { store, setStore } from '../store'

const setWorkdir = async (
  workdir: string
): Promise<void> => {
  const currentWorkdir = cwd()

  setStore({ ...store, cwd: currentWorkdir })

  const workdirPath = resolve(workdir)

  if (currentWorkdir !== workdirPath) {
    log('---------------- Change working directory ------------------------')

    chdir(workdirPath)
    log(`Using ${workdirPath} as working directory...`)
  }
}

export default setWorkdir
