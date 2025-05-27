import execGpg from './execGpg'

const deleteKey = async (
  fingerprint: string
): Promise<void> => {
  const args = [
    '--batch',
    '--yes',
    fingerprint
  ]

  const setArgs = (
    arg: string
  ): string[] => [
    ...args.slice(0, 2),
    arg,
    ...args.slice(-1)
  ]

  await execGpg(setArgs('--delete-secret-keys'))
  await execGpg(setArgs('--delete-keys'))
}

export default deleteKey
