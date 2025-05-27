import git, { type Result } from './git'

interface Options {
  allowEmpty?: boolean
  keyid?: string
  sign?: boolean
}

const getArgs = (
  message: string,
  {
    allowEmpty = false,
    keyid,
    sign = false
  }: Options = {}
): string[] => {
  const args: string[] = []

  if (sign) {
    const flag = '-S'

    const arg = typeof keyid === 'string' && keyid !== ''
      ? `${flag}${keyid}`
      : flag

    args.push(arg)
  }

  if (allowEmpty) {
    args.push('--allow-empty')
  }

  return [...args, '-m', `${message}`]
}

const commit = async (
  message: string,
  options: Options = {}
): Promise<Result> => {
  const args = getArgs(message, options)

  const result = await git('commit', args)

  return result
}

export default commit
