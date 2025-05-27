import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { GPG_AGENT_CONF_FILE } from './consts'

import gpgConnectAgent from './gpgConnectAgent'

const configureAgent = async (
  homedir: string,
  config: string
): Promise<void> => {
  const gpgAgentConf = join(homedir, GPG_AGENT_CONF_FILE)

  writeFileSync(gpgAgentConf, config)

  await gpgConnectAgent('RELOADAGENT')
}

export default configureAgent
