import type Options from './Options'

type GitSignUser = Exclude<Options['gitSignUser'], undefined>

export default GitSignUser
