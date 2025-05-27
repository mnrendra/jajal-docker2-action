import { exec } from '../../helpers'

type Command =
| 'RELOADAGENT'
| `PRESET_PASSPHRASE ${string} ${number} ${string}`
| `KEYINFO ${string}`
| 'KILLAGENT'

const gpgConnectAgent = async (
  command: Command
): Promise<string> => {
  const { stdout } = await exec('gpg-connect-agent', [command, '/bye'])

  return stdout
}

export default gpgConnectAgent
