import {
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
} from './libs'

import { defineProperties } from './utils'

defineProperties(git, {
  add,
  commit,
  config,
  getConfig,
  setConfig,
  lsRemote,
  push,
  reset,
  rm,
  tag
})

type GitFn = typeof git

export interface Git extends GitFn {
  add: typeof add
  commit: typeof commit
  config: typeof config
  getConfig: typeof getConfig
  setConfig: typeof setConfig
  lsRemote: typeof lsRemote
  push: typeof push
  reset: typeof reset
  rm: typeof rm
  tag: typeof tag
}

export default git as Git
