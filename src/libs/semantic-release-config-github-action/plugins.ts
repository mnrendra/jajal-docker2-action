import type { PluginSpec } from 'semantic-release'

const CONTAINER_WORKDIR = '/action'

const COMMIT_TYPES = [
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert'
] as const

const releaseRules = COMMIT_TYPES.map((type) => ({
  type,
  release: 'patch'
} as const))

const plugins: ReadonlyArray<PluginSpec<any>> = [
  ['@semantic-release/commit-analyzer', { releaseRules }],
  '@semantic-release/release-notes-generator',
  ['@semantic-release/npm', { npmPublish: false }],
  [`${CONTAINER_WORKDIR}/@mnrendra/semantic-release-plugin-github-action`, {
    actionFile: 'action.yml',
    ignoreFile: '.ghaignore',
    releaseMessage: 'release: v{nextRelease.version}\n\n{nextRelease.notes}',
    latestMessage: 'latest: v{nextRelease.version}\n\n{nextRelease.notes}',
    sign: true
  }],
  '@semantic-release/github'
]

export default plugins
