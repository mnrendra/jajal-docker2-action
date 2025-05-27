import { cwd, env } from 'node:process'

import semanticRelease from 'semantic-release'

import { WORKDIR } from './consts'

import defaultModule from './libs/default-module'
import git from './libs/git'
import { importGPG, cleanupGPG } from './libs/import-gpg'
import config from './libs/semantic-release-config-github-action'

import { getInputs } from './utils'

const main = async (): Promise<string> => {
  await git.setConfig('safe.directory', WORKDIR, 'global')

  const inputs = getInputs()

  let digest = ''
  let name = 'GitOps Release'
  let email = 'gitops-release@users.noreply.github.com'
  let currentWorkdir = cwd()

  const { privateKey, token } = inputs

  if (privateKey !== undefined) {
    const outputs = await importGPG(privateKey, { ...inputs, verbose: true })

    digest = outputs.digest
    name = outputs.name
    email = outputs.email
    currentWorkdir = outputs.workdir
  }

  const release = defaultModule(semanticRelease)

  console.log('GITHUB_TOKEN:', token?.slice(0, 34))

  const result = await release(config, {
    env: {
      ...env,
      GIT_AUTHOR_NAME: name,
      GIT_AUTHOR_EMAIL: email,
      GIT_COMMITTER_NAME: name,
      GIT_COMMITTER_EMAIL: email,
      GITHUB_TOKEN: token
    }
  })

  if (result !== false) {
    console.log('release:', result.nextRelease.version)
  } else {
    console.warn('failed to release!')
  }

  await cleanupGPG(digest)

  return currentWorkdir
}

export default main
