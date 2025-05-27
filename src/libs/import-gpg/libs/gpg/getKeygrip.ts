import execGpg from './execGpg'

import parseKeygripFromGpgColonsOutput from './parseKeygripFromGpgColonsOutput'

const getKeygrip = async (
  fingerprint: string
): Promise<string> => {
  const args = [
    '--batch',
    '--with-colons',
    '--with-keygrip',
    '--list-secret-keys',
    fingerprint
  ]

  const { stdoutLines } = await execGpg(args)

  const keygrip = parseKeygripFromGpgColonsOutput(stdoutLines, fingerprint)

  return keygrip
}

export default getKeygrip
