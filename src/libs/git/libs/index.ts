import add from './add'
import commit from './commit'
import config, { getConfig, setConfig } from './config'
import git from './git'
import lsRemote from './lsRemote'
import push from './push'
import reset from './reset'
import rm from './rm'
import tag from './tag'

export type {
  Command,
  Result
} from './git'

export type {
  GitConfig,
  GitConfigKey,
  GitConfigScope,
  GitConfigValue
} from './config'

export {
  add,
  commit,
  config,
  getConfig,
  setConfig,
  git,
  lsRemote,
  push,
  reset,
  rm,
  tag
}
