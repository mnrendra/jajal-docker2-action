import type { TrustLevel } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getTrustLevel = (): TrustLevel => {
  const trustLevel = getInput(INPUTS.GPG_TRUST_LEVEL)

  if (trustLevel === undefined || trustLevel === '') {
    return DEFAULT_VALUE.GPG_TRUST_LEVEL
  }

  const level = Number(trustLevel)

  if (Number.isNaN(level) || level < 1 || level > 5) {
    throw new Error(`Invalid ${INPUTS.GPG_TRUST_LEVEL} input`, {
      cause: trustLevel
    })
  }

  return level as TrustLevel
}

export default getTrustLevel
