import type Options from './Options'

type GitSignTag = Exclude<Options['gitSignTag'], undefined>

export default GitSignTag
