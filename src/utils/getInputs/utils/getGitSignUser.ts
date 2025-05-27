import type { GitSignUser } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getGitSignUser = (): GitSignUser => {
  const gitSignUser = getInput(INPUTS.GIT_SIGN_USER)

  if (gitSignUser === undefined || gitSignUser === '') {
    return DEFAULT_VALUE.GIT_SIGN_USER
  }

  if (typeof gitSignUser === 'boolean') {
    return gitSignUser
  }

  switch (gitSignUser) {
    case 'false': return false
    case 'true': return true
    default: throw new Error(`Invalid ${INPUTS.GIT_SIGN_USER} input`, {
      cause: gitSignUser
    })
  }
}

export default getGitSignUser
