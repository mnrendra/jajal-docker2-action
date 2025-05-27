import git, { type Result } from './git'

interface Options {
  commit?: string
  delete?: boolean
  force?: boolean
  list?: boolean
  message?: string
  sign?: boolean
}

const getArgs = (
  name: string,
  {
    commit,
    delete: del = false,
    force = false,
    list = false,
    message = '',
    sign = false
  }: Options = {}
): string[] => {
  if (del) return ['-d', name]

  if (list) {
    if (name === '') return ['-l']
    return ['-l', name]
  }

  const args: string[] = []

  if (force) args.push('-f')

  if (sign) args.push('-s')

  args.push(name)

  if (commit !== undefined) args.push(commit)

  return [...args, '-m', `${message}`]
}

const tag = async (
  name: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(name, options)

  const result = await git('tag', args)

  return result
}

export default tag
