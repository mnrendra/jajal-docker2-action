import type { PublishContext } from 'semantic-release'

import {
  ACTION_YML,
  GHA_IGNORE
} from '../consts'

import {
  prepareGitIgnore,
  parsePublishContext,
  syncGit,
  parseMessage,
  restoreGitIgnore,
  updateActionVersion
} from '../utils'

interface Options {
  actionFile?: string
  ignoreFile?: string
  ignoreContent?: string
  latestMessage?: string
  releaseMessage?: string
  sign?: boolean
}

const publish = async (
  {
    actionFile = ACTION_YML,
    ignoreFile = GHA_IGNORE,
    ignoreContent,
    latestMessage = 'latest: v{nextRelease.version}\n\n{nextRelease.notes}',
    releaseMessage = 'release: v{nextRelease.version}\n\n{nextRelease.notes}',
    sign = false
  }: Options = {},
  context: PublishContext
): Promise<void> => {
  const {
    branch,
    tag,
    version
  } = parsePublishContext(context)

  const {
    ghaIgnores,
    gitIgnores,
    backupFile
  } = prepareGitIgnore(ignoreFile, ignoreContent)

  updateActionVersion(actionFile, version)

  await syncGit(ghaIgnores, gitIgnores, {
    branch,
    message: parseMessage(context, releaseMessage),
    sign,
    tag
  })

  restoreGitIgnore(backupFile)

  await syncGit(gitIgnores, ghaIgnores, {
    branch,
    message: parseMessage(context, latestMessage),
    sign
  })
}

export default publish
