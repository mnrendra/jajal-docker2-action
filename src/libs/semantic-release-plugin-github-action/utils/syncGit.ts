import git from '../../../libs/git'

interface Params {
  branch: string
  message: string
  sign: boolean
  tag?: string
}

const syncGit = async (
  removeContents: string[],
  addContents: string[],
  {
    branch,
    message,
    sign,
    tag
  }: Params
): Promise<void> => {
  await git.add('.')

  for (const removeContent of removeContents) {
    if (!addContents.includes(removeContent)) {
      await git.rm(removeContent, {
        force: true,
        cached: true,
        ignoreUnmatch: true,
        recursive: removeContent.endsWith('/'),
        quiet: true
      })
    }
  }

  for (const addContent of addContents) {
    if (!removeContents.includes(addContent)) {
      try {
        await git.add(addContent, { force: true })
      } catch (error) {
        if (!(error instanceof Error)) {
          throw new Error('Unknown error', { cause: error })
        }

        if (
          !('message' in error) ||
          typeof error.message !== 'string' ||
          !error.message.includes(`fatal: pathspec '${addContent}' did not match any files`)
        ) {
          throw error
        }
      }
    }
  }

  await git.commit(message, { allowEmpty: true, sign })
  await git.push(branch)

  if (typeof tag !== 'string' || tag === '') return

  await git.tag(tag, { force: true, message, sign })
  await git.push(tag, { force: true })
}

export default syncGit
