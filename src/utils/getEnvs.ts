import { env } from 'node:process'

type Envs = Record<string, string | undefined>

const getEnvs = (): Envs => {
  if (typeof env !== 'object' || env === null || Array.isArray(env)) return {}

  const envs: Envs = {}

  Object.keys(env).filter((key) => (
    key.startsWith('ACTIONS_') ||
    key.startsWith('CI') ||
    key.startsWith('GITHUB_') ||
    key.startsWith('INPUT_') ||
    key.startsWith('RUNNER_')
  )).sort().forEach((key) => {
    envs[key] = env[key]
  })

  return envs
}

export default getEnvs
