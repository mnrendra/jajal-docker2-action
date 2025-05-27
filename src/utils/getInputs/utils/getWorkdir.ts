import type { Workdir } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getWorkdir = (): Workdir => {
  const workdir = getInput(INPUTS.WORKDIR)

  if (workdir === undefined || workdir === '') {
    return DEFAULT_VALUE.WORKDIR
  }

  if (typeof workdir !== 'string') {
    throw new Error(`Invalid ${INPUTS.WORKDIR} input`, {
      cause: workdir
    })
  }

  return workdir
}

export default getWorkdir
