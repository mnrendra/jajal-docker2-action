import type { GitSignTag } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getGitSignTag = (): GitSignTag => {
  const gitSignTag = getInput(INPUTS.GIT_SIGN_TAG)

  if (gitSignTag === undefined || gitSignTag === '') {
    return DEFAULT_VALUE.GIT_SIGN_TAG
  }

  if (typeof gitSignTag === 'boolean') {
    return gitSignTag
  }

  switch (gitSignTag) {
    case 'false': return false
    case 'true': return true
    default: throw new Error(`Invalid ${INPUTS.GIT_SIGN_TAG} input`, {
      cause: gitSignTag
    })
  }
}

export default getGitSignTag
