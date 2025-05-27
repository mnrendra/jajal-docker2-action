import type { Options } from 'semantic-release'

import branches from './branches'
import plugins from './plugins'

const config: Options = {
  branches,
  plugins,
  dryRun: false,
  ci: true
}

export default config
