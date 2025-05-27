import type { GitSignPush } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getGitSignPush = (): GitSignPush => {
  const gitSignPush = getInput(INPUTS.GIT_SIGN_PUSH)

  if (gitSignPush === undefined || gitSignPush === '') {
    return DEFAULT_VALUE.GIT_SIGN_PUSH
  }

  if (typeof gitSignPush === 'boolean') {
    return gitSignPush
  }

  switch (gitSignPush) {
    case 'false': return false
    case 'true': return true
    case 'if-asked': return 'if-asked'
    default: throw new Error(`Invalid ${INPUTS.GIT_SIGN_PUSH} input`, {
      cause: gitSignPush
    })
  }
}

export default getGitSignPush
