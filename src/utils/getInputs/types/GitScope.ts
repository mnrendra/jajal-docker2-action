import type Options from './Options'

type GitScope = Exclude<Options['gitScope'], undefined>

export default GitScope
