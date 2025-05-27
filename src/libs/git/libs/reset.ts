import git, { type Result } from './git'

interface Options {
  quiet?: boolean
}

const getArgs = (
  pathspec: string,
  {
    quiet = false
  }: Options = {}
): string[] => {
  const args: string[] = []

  if (quiet) args.push('-q')

  return [...args, '--', pathspec]
}

const reset = async (
  pathspec: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(pathspec, options)

  const result = await git('reset', args)

  return result
}

export default reset
