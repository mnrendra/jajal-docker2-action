import type { Options as SROptions, PublishContext } from 'semantic-release'

import git from '../../../libs/git'

import { parseMessage, parsePublishContext } from '../utils'

interface TagOptions {
  message?: string
  sign?: boolean
}

interface CommitOptions extends TagOptions {
  allowEmpty?: boolean
}

interface Options extends SROptions {
  commit?: CommitOptions
  tag?: TagOptions
}

const publish = async (
  {
    commit = {},
    tag = {}
  }: Options = {},
  context: PublishContext
): Promise<void> => {
  const { branch: branchName, tag: tagName } = parsePublishContext(context)

  const parsedCommitMsg = parseMessage(context, commit.message ?? '')
  const parsedTagMsg = parseMessage(context, tag.message ?? '')

  /* eslint-disable-next-line max-len */
  await git.commit(parsedCommitMsg, { sign: commit.sign ?? false, allowEmpty: commit.allowEmpty ?? false })

  await git.push(branchName)

  await git.tag(tagName, { delete: true })

  await git.tag(tagName, { sign: tag.sign ?? false, message: parsedTagMsg })

  await git.push(tagName, { delete: true })

  await git.push(tagName)
}

export default publish
