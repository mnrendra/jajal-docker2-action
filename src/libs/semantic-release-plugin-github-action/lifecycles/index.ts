import publish from './publish'

// import git from '../../../libs/git'

// const print = async (
//   step: string,
//   context: any = {}
// ): Promise<void> => {
//   const tagName = context?.nextRelease?.gitTag ?? 'undefined'
//   console.log(`----------${step}:`, tagName)
//   const tag = await git.tag('', { list: tagName })
//   console.log('----------list local tags----------')
//   console.log('stderr:', tag.stderr)
//   console.log('stdout:', tag.stdout)
//   console.log('----------check remtoe tag----------')
//   const lsRemote = await git.lsRemote('origin', { tags: tagName })
//   console.log('stderr:', lsRemote.stderr)
//   console.log('stdout:', lsRemote.stdout)
//   console.log(`----------${step}----------done!`)
// }

// const verifyConditions = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('verifyConditions', ctx)
// }

// const analyzeCommits = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('analyzeCommits', ctx)
// }

// const verifyRelease = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('verifyRelease', ctx)
//   const tagName: string = ctx?.nextRelease?.gitTag ?? 'coba-coba'
//   console.log('----------VERIFY RELEASE----------', tagName)
//   await git.tag(tagName, { sign: true, message: `dari verifyRelease ${tagName} !` })
//   await git.push(tagName)
//   await print('verifyRelease', ctx)
// }

// const generateNotes = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('generateNotes', ctx)
// }

// const addChannel = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('addChannel', ctx)
// }

// const prepare = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('prepare', ctx)
// }

// const success = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('success', ctx)
// }

// const fail = async (opt = {}, ctx: any = {}): Promise<void> => {
//   await print('fail', ctx)
// }

export {
  // verifyConditions,
  // analyzeCommits,
  // verifyRelease,
  // generateNotes,
  // addChannel,
  // prepare,
  publish // ,
  // success,
  // fail
}
