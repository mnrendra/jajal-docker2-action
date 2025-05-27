import type {
  VerifyConditionsContext,
  AnalyzeCommitsContext,
  VerifyReleaseContext,
  GenerateNotesContext,
  AddChannelContext,
  PrepareContext,
  PublishContext,
  SuccessContext,
  FailContext
} from 'semantic-release'

import getNested from './getNested'

type Context =
| VerifyConditionsContext
| AnalyzeCommitsContext
| VerifyReleaseContext
| GenerateNotesContext
| AddChannelContext
| PrepareContext
| PublishContext
| SuccessContext
| FailContext

const parseMessage = (
  context: Context,
  message: string = ''
): string => {
  const matches = [...message.matchAll(/{(.*?)}/g)]
  const paths = matches.map((match) => match[1])

  const parsedMessage = paths.reduce((acc, key) => {
    const value = getNested(context, key)
    return acc.replace(`{${key}}`, `${value}`)
  }, message)

  return parsedMessage
}

export default parseMessage
