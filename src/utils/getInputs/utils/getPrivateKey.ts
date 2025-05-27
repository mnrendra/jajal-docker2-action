import type { PrivateKey } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getPrivateKey = (): PrivateKey => {
  const privateKey = getInput(INPUTS.GPG_PRIVATE_KEY)

  if (privateKey === undefined || privateKey === '') {
    return DEFAULT_VALUE.GPG_PRIVATE_KEY
  }

  if (typeof privateKey !== 'string') {
    throw new Error(`Invalid ${INPUTS.GPG_PRIVATE_KEY} input`, {
      cause: privateKey
    })
  }

  return privateKey
}

export default getPrivateKey
