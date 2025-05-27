import type Options from './Options'

type GitSignPush = Exclude<Options['gitSignPush'], undefined>

export default GitSignPush
