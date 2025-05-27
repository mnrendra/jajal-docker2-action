import type { GitSignCommit } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getGitSignCommit = (): GitSignCommit => {
  const gitSignCommit = getInput(INPUTS.GIT_SIGN_COMMIT)

  if (gitSignCommit === undefined || gitSignCommit === '') {
    return DEFAULT_VALUE.GIT_SIGN_COMMIT
  }

  if (typeof gitSignCommit === 'boolean') {
    return gitSignCommit
  }

  switch (gitSignCommit) {
    case 'false': return false
    case 'true': return true
    default: throw new Error(`Invalid ${INPUTS.GIT_SIGN_COMMIT} input`, {
      cause: gitSignCommit
    })
  }
}

export default getGitSignCommit
