import type Options from './Options'

type Workdir = Exclude<Options['workdir'], undefined>

export default Workdir
