import type { Fingerprint } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getFingerprint = (): Fingerprint => {
  const fingerprint = getInput(INPUTS.GPG_FINGERPRINT)

  if (fingerprint === undefined || fingerprint === '') {
    return DEFAULT_VALUE.GPG_FINGERPRINT
  }

  if (typeof fingerprint !== 'string') {
    throw new Error(`Invalid ${INPUTS.GPG_FINGERPRINT} input`, {
      cause: fingerprint
    })
  }

  return fingerprint
}

export default getFingerprint
