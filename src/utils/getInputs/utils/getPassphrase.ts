import type { Passphrase } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getPassphrase = (): Passphrase => {
  const passphrase = getInput(INPUTS.GPG_PASSPHRASE)

  if (passphrase === undefined || passphrase === '') {
    return DEFAULT_VALUE.GPG_PASSPHRASE
  }

  if (typeof passphrase !== 'string') {
    throw new Error(`Invalid ${INPUTS.GPG_PASSPHRASE} input`, {
      cause: passphrase
    })
  }

  return passphrase
}

export default getPassphrase
