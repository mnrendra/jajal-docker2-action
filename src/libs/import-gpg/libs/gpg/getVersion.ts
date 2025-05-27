import execGpg from './execGpg'

export interface Version {
  gnupg: string
  libgcrypt: string
}

type VersionKey = keyof Version

type GPGLib =
| 'gpg (GnuPG)'
| 'gpg (GnuPG/MacGPG2)'
| 'libgcrypt'

const parseLineVersion = (
  line: string,
  lib: GPGLib
): string => {
  return line.slice(lib.length + 1).trim()
}

const getVersion = async (): Promise<Version> => {
  const args = ['--version']

  const { stdoutLines } = await execGpg(args)

  const version: Version = {
    gnupg: '',
    libgcrypt: ''
  }

  stdoutLines.forEach((line) => {
    if (line.startsWith('gpg (GnuPG) ')) {
      version.gnupg = parseLineVersion(line, 'gpg (GnuPG)')
    } else if (line.startsWith('gpg (GnuPG/MacGPG2) ')) {
      version.gnupg = parseLineVersion(line, 'gpg (GnuPG/MacGPG2)')
    } else if (line.startsWith('libgcrypt ')) {
      version.libgcrypt = parseLineVersion(line, 'libgcrypt')
    }
  })

  Object.keys(version).forEach((key) => {
    const val = version[key as VersionKey]

    if (typeof val !== 'string' || val === '') {
      throw new Error(`Invalid GPG ${key}`, { cause: val })
    }
  })

  return version
}

export default getVersion
