import { copyFileSync, existsSync } from 'node:fs'

const backupFile = (
  file: string,
  suffix: string
): string | undefined => {
  if (!existsSync(file)) return

  let backupPath = file + suffix
  while (existsSync(backupPath)) {
    backupPath = backupPath + suffix
  }

  copyFileSync(file, backupPath)

  return backupPath
}

export default backupFile
