import { exec } from '../../helpers'

interface Options {
  input?: Buffer | string
}

const execGpg = async (
  args: string[] = [],
  options: Options = {}
): Promise<ReturnType<typeof exec>> => {
  const result = await exec('gpg', args, options)
  return result
}

export default execGpg
