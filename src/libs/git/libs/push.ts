import git, { type Result } from './git'

interface Options {
  delete?: boolean
  force?: boolean
  remote?: string
  signed?: boolean | 'if-asked'
}

const getArgs = (
  refs: string,
  {
    delete: del = false,
    force = false,
    remote = 'origin',
    signed = false
  }: Options = {}
): string[] => {
  const args: string[] = [remote, refs]

  if (del) {
    return [remote, '-d', refs]
  }

  if (force) {
    args.push('-f')
  }

  if (signed !== false) {
    args.push(`--signed=${signed}`)
  }

  return args
}

const push = async (
  refs: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(refs, options)

  const result = await git('push', args)

  return result
}

export default push
