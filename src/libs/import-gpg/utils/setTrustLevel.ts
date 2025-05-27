import type { TrustLevel } from '../libs/gpg'

import { log } from '../../../libs/logger'

import { setTrust } from '../libs/gpg'

const setTrustLevel = async (
  keyid: string,
  trustLevel?: TrustLevel
): Promise<string> => {
  if (trustLevel === undefined) return ''

  const level = Number(trustLevel)

  if (Number.isNaN(level) || level < 1 || level > 5) {
    throw new Error('Invalid GPG Trust Level value', { cause: trustLevel })
  }

  log('---------------- Setting key\'s trust level ----------------------')
  await setTrust(keyid, trustLevel)
  log(`Trust level set to ${trustLevel} for ${keyid}`)

  return `Trust level set to ${trustLevel} for ${keyid}`
}

export default setTrustLevel
