// import { existsSync } from 'node:fs'
// import { EOL } from 'node:os'
// import { join } from 'node:path'

// import { readFile, writeFile } from '../../helpers'

// import { GPG_AGENT_COMMAND, GPG_AGENT_CONF_FILE } from './consts'

// import gpgConnectAgent from './gpgConnectAgent'

// const configureAgent = async (
//   homedir: string,
//   config: string
// ): Promise<void> => {
//   const file = join(homedir, GPG_AGENT_CONF_FILE)

//   if (existsSync(file)) {
//     const configs = readFile(file).split(EOL)

//     if (configs.length === 0 || (configs.length === 1 && configs[0] === '')) {
//       configs[0] = config
//     } else if (configs[configs.length - 1] === '') {
//       configs[configs.length - 2] += config
//     } else {
//       configs[configs.length - 1] += config
//     }

//     writeFile(file, configs.join(EOL))
//   } else {
//     writeFile(file, config)
//   }

//   await gpgConnectAgent(GPG_AGENT_COMMAND.RELOADAGENT)
// }

// export default configureAgent
