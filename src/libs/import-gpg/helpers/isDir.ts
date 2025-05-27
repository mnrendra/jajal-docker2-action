import { statSync } from 'node:fs'

const isDir = (
  dir: string
): boolean => {
  try {
    const stat = statSync(dir)
    return stat.isDirectory()
  } catch {
    return false
  }
}

export default isDir
