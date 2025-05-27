import git from '../../../libs/git'
import { logger } from '../../../libs/logger'

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

  console.log('removeContents:', removeContents)
  console.log('addContents:', addContents)

  for (const removeContent of removeContents) {
    console.log('removeContent:', removeContent)
    if (!addContents.includes(removeContent)) {
      console.log('----------removeContent:', removeContent)
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
    console.log('addContent:', addContent)
    if (!removeContents.includes(addContent)) {
      console.log('----------addContent:', addContent)
      try {
        await git.add(addContent, { force: true })
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : `Uknown error from: ${error as any}`

        logger.warn(message)
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
