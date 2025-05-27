import type Options from './Options'

type GitSignCommit = Exclude<Options['gitSignCommit'], undefined>

export default GitSignCommit
