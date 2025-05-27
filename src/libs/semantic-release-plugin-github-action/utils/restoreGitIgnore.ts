import { copyFileSync, existsSync, rmSync } from 'node:fs'

import { GIT_IGNORE } from '../consts'

const restoreGitIgnore = (
  backupFile: string = ''
): void => {
  if (!existsSync(backupFile)) return

  rmSync(GIT_IGNORE, { force: true })

  copyFileSync(backupFile, GIT_IGNORE)

  rmSync(backupFile, { force: true })
}

export default restoreGitIgnore
