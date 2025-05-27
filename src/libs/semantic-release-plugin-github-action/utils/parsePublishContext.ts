import type { PublishContext } from 'semantic-release'

interface ParsedPublishContext {
  branch: string
  version: string
  tag: string
  notes: string
}

const parsePublishContext = ({
  branch,
  nextRelease
}: PublishContext): ParsedPublishContext => ({
  branch: branch.name,
  version: nextRelease.version,
  tag: nextRelease.gitTag,
  notes: nextRelease.notes ?? ''
})

export default parsePublishContext
