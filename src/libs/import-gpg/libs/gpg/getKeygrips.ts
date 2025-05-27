import execGpg from './execGpg'

const getKeygrips = async (
  fingerprint: string
): Promise<string[]> => {
  const args = [
    '--batch',
    '--with-colons',
    '--with-keygrip',
    '--list-secret-keys',
    fingerprint
  ]

  const { stdoutLines } = await execGpg(args)

  const keygrips: string[] = []

  stdoutLines.forEach((line) => {
    if (line.startsWith('grp')) {
      keygrips.push(line.replace(/(grp|:)/g, '').trim())
    }
  })

  return keygrips
}

export default getKeygrips
