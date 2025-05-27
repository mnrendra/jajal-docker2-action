import { env } from 'node:process'

const DEFAULT_VALUE = Object.freeze({
  WORKDIR: '.',
  GPG_PRIVATE_KEY: undefined,
  GPG_PASSPHRASE: undefined,
  GPG_FINGERPRINT: undefined,
  GPG_TRUST_LEVEL: undefined,
  GIT_SCOPE: 'local',
  GIT_SIGN_USER: true,
  GIT_SIGN_COMMIT: false,
  GIT_SIGN_TAG: false,
  GIT_SIGN_PUSH: false,
  TOKEN: env.GITHUB_TOKEN
})

export default DEFAULT_VALUE
