import { GPG_AGENT_CONF } from './consts'

import configureAgent from './configureAgent'
import deleteKey from './deleteKey'
import getDirs, { type Dirs } from './getDirs'
import getHome from './getHome'
import getKeygrip from './getKeygrip'
import getKeygrips from './getKeygrips'
import getVersion, { type Version } from './getVersion'
import importKey from './importKey'
import killAgent from './killAgent'
import parseKeygripFromGpgColonsOutput from './parseKeygripFromGpgColonsOutput'
import presetPassphrase from './presetPassphrase'
import setTrust, { type TrustLevel } from './setTrust'

export type {
  Dirs,
  TrustLevel,
  Version
}

export {
  GPG_AGENT_CONF,
  configureAgent,
  deleteKey,
  getDirs,
  getHome,
  getKeygrip,
  getKeygrips,
  getVersion,
  importKey,
  killAgent,
  parseKeygripFromGpgColonsOutput,
  presetPassphrase,
  setTrust
}

export default {
  GPG_AGENT_CONF,
  configureAgent,
  deleteKey,
  getDirs,
  getHome,
  getKeygrip,
  getKeygrips,
  getVersion,
  importKey,
  killAgent,
  parseKeygripFromGpgColonsOutput,
  presetPassphrase,
  setTrust
}
