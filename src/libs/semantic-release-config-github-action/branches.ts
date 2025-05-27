import type { BranchObject, BranchSpec } from 'semantic-release'

const PRERELEASE_BRANCHES = [
  'alpha',
  'beta',
  'rc'
] as const

const prereleaseBranches = PRERELEASE_BRANCHES.map<BranchObject>((name) => ({
  name,
  prerelease: true
}))

const branches: readonly BranchSpec[] = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  'next',
  ...prereleaseBranches
]

export default branches
