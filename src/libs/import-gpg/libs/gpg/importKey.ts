import { mkdtempSync, writeFileSync, unlinkSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { nanoid } from 'nanoid'

import { getArmoredKey } from '../openpgp'

import execGpg from './execGpg'

const importKey = async (
  key: string
): Promise<string> => {
  const tempDir = join(tmpdir(), `mnrendra-import-gpg-${nanoid()}`)
  const keyDir = mkdtempSync(tempDir)
  const keyPath = `${keyDir}/${nanoid()}.pgp`

  const armoredKey = getArmoredKey(key)

  writeFileSync(keyPath, armoredKey, { mode: 0o600 })

  const args = [
    '--import',
    '--batch',
    '--yes',
    keyPath
  ]

  const { stdout, stderr } = await execGpg(args)

  if (stderr !== '') {
    return stderr
  }

  unlinkSync(keyPath)

  rmSync(keyDir)

  return stdout
}

export default importKey
