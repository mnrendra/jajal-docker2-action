import git, { type Result } from './git'

export interface GitConfig {
  'commit.gpgsign': boolean
  'imap.port': number
  'push.gpgsign': boolean | 'if-asked'
  'safe.directory': string
  'tag.gpgsign': boolean
  'user.signingkey': string
  'user.name': string
  'user.email': string
}

export type GitConfigKey =
| 'commit.gpgsign'
| 'imap.port'
| 'push.gpgsign'
| 'safe.directory'
| 'tag.gpgsign'
| 'user.signingkey'
| 'user.name'
| 'user.email'

/* eslint-disable @typescript-eslint/indent */
export type GitConfigValue<K extends GitConfigKey> =
| K extends 'commit.gpgsign' ? GitConfig['commit.gpgsign'] : never
| K extends 'imap.port' ? GitConfig['imap.port'] : never
| K extends 'push.gpgsign' ? GitConfig['push.gpgsign'] : never
| K extends 'safe.directory' ? GitConfig['safe.directory'] : never
| K extends 'tag.gpgsign' ? GitConfig['tag.gpgsign'] : never
| K extends 'user.signingkey' ? GitConfig['user.signingkey'] : never
| K extends 'user.name' ? GitConfig['user.name'] : never
| K extends 'user.email' ? GitConfig['user.email'] : never
/* eslint-enable @typescript-eslint/indent */

export type GitConfigScope =
| 'global'
| 'local'
| 'system'
| 'worktree'

interface Options<K extends GitConfigKey> {
  get?: boolean
  list?: boolean
  scope?: GitConfigScope
  unset?: boolean
  value?: GitConfigValue<K>
}

const getArgs = <K extends GitConfigKey>(
  configKey: K,
  {
    get = false,
    list = false,
    unset = false,
    scope = 'local',
    value
  }: Options<K> = {}
): string[] => {
  const args: string[] = [`--${scope}`]

  if (value !== undefined && value !== null) {
    args.push(`${configKey}`, `${value.toString()}`)
  } else if (get) {
    args.push('--get', `${configKey}`)
  } else if (unset) {
    args.push('--unset', `${configKey}`)
  } else if (list) {
    args.push('--list')
  }

  return args
}

const config = async <K extends GitConfigKey>(
  configKey: K,
  options: Options<K>
): Promise<Result> => {
  const args = getArgs<K>(configKey, options)

  const result = await git('config', args)

  return result
}

export const getConfig = async <K extends GitConfigKey>(
  gitConfigKey: K,
  gitConfigScope: GitConfigScope = 'local'
): Promise<GitConfigValue<K>> => {
  const { stdout } = await config(gitConfigKey, {
    get: true,
    scope: gitConfigScope
  })

  if (stdout === 'false') return false as GitConfigValue<K>
  if (stdout === 'true') return true as GitConfigValue<K>

  const num = Number(stdout)
  if (!Number.isNaN(num)) return num as GitConfigValue<K>

  return stdout as GitConfigValue<K>
}

export const setConfig = async <K extends GitConfigKey>(
  gitConfigKey: K,
  gitConfigValue: GitConfigValue<K>,
  gitConfigScope: GitConfigScope = 'local'
): Promise<Result> => {
  const result = await config(gitConfigKey, {
    scope: gitConfigScope,
    value: gitConfigValue
  })

  return result
}

export default config
