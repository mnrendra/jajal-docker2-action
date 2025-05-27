import git, { type Result } from './git'

interface Options {
  force?: boolean
}

const getArgs = (
  pathspec: string,
  {
    force = false
  }: Options = {}
): string[] => {
  const args: string[] = []

  if (force) args.push('-f')

  return [...args, '--', pathspec]
}

const add = async (
  pathspec: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(pathspec, options)

  const result = await git('add', args)

  return result
}

export default add
