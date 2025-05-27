import type { Token } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getToken = (): Token => {
  const token = getInput(INPUTS.TOKEN)

  if (token === undefined || token === '') {
    return DEFAULT_VALUE.TOKEN
  }

  if (typeof token !== 'string') {
    throw new Error(`Invalid ${INPUTS.TOKEN} input`, {
      cause: token
    })
  }

  return token
}

export default getToken
