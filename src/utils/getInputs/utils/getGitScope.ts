import type { GitScope } from '../types'

import { getInput } from '@actions/core'

import { INPUTS, DEFAULT_VALUE } from '../consts'

const getGitScope = (): GitScope => {
  const gitScope = getInput(INPUTS.GIT_SCOPE)

  if (gitScope === undefined || gitScope === '') {
    return DEFAULT_VALUE.GIT_SCOPE
  }

  if (typeof gitScope !== 'string' || !['global', 'local'].includes(gitScope)) {
    throw new Error(`Invalid ${INPUTS.GIT_SCOPE} input`, {
      cause: gitScope
    })
  }

  return gitScope as GitScope
}

export default getGitScope
