import git, { type Result } from './git'

interface Options {
  cached?: boolean
  force?: boolean
  ignoreUnmatch?: boolean
  quiet?: boolean
  recursive?: boolean
}

const getArgs = (
  pathspec: string,
  {
    cached = false,
    force = false,
    ignoreUnmatch = false,
    quiet = false,
    recursive = false
  }: Options = {}
): string[] => {
  const args: string[] = []

  if (force) args.push('-f')
  if (cached) args.push('--cached')
  if (ignoreUnmatch) args.push('--ignore-unmatch')
  if (quiet) args.push('-q')
  if (recursive) args.push('-r')

  return [...args, '--', pathspec]
}

const rm = async (
  pathspec: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(pathspec, options)

  const result = await git('rm', args)

  return result
}

export default rm
