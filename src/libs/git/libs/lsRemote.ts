import git, { type Result } from './git'

interface Options {
  tags?: boolean | string
}

const getArgs = (
  remote: string,
  {
    tags = false
  }: Options = {}
): string[] => {
  const args: string[] = []

  let refs = ''

  if (tags === true) args.push('--tags')

  if (typeof tags === 'string') refs = tags

  return [...args, remote, refs]
}

const lsRemote = async (
  remote: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(remote, options)

  const result = await git('ls-remote', args)

  return result
}

export default lsRemote
