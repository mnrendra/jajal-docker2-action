import { exec } from '../../helpers'

const execGpgconf = async (
  args: string[] = []
): Promise<ReturnType<typeof exec>> => {
  const result = await exec('gpgconf', args)
  return result
}

export default execGpgconf
