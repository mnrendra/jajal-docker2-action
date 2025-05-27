import type ImportGPG from './ImportGPG'

type Options = Exclude<Parameters<ImportGPG>[1], undefined>

export default Options
