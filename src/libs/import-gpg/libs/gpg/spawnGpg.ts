import { type Result, execa } from 'execa'

interface Options {
  input?: Buffer | string
}

const spawnGpg = async (
  args: string[] = [],
  options: Options = {}
): Promise<Result<Record<any, unknown>>> => {
  return await execa('gpg', args, options)
}

export default spawnGpg
