import { copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs'

import { GIT_IGNORE, BACKUP_SUFFIX } from '../consts'

import parseIgnore from './parseIgnore'
import backupFile from './backupFile'

interface Ignore {
  ghaIgnores: string[]
  gitIgnores: string[]
  backupFile?: string
}

const prepareGitIgnore = (
  ignoreFile: string,
  ignoreContent?: string
): Ignore => {
  const ignore: Ignore = {
    ghaIgnores: [],
    gitIgnores: []
  }

  if (!existsSync(ignoreFile)) return ignore

  const ghaIgnore = ignoreContent ?? readFileSync(ignoreFile, 'utf8')
  ignore.ghaIgnores = parseIgnore(ghaIgnore)

  const backupedFile = backupFile(GIT_IGNORE, BACKUP_SUFFIX)

  if (backupedFile !== undefined) {
    ignore.backupFile = backupedFile

    const gitIgnore = readFileSync(backupedFile, 'utf8')
    ignore.gitIgnores = parseIgnore(gitIgnore)

    rmSync(GIT_IGNORE, { force: true })
  }

  copyFileSync(ignoreFile, GIT_IGNORE)

  return ignore
}

export default prepareGitIgnore
