import { EOL } from 'node:os'

const processLineBuffer = (
  data: Buffer,
  strBuffer: string,
  onLine?: (line: string) => void
): string => {
  try {
    let s = strBuffer + data.toString()
    let n = s.indexOf(EOL)

    while (n > -1) {
      const line = s.substring(0, n)

      if (typeof onLine === 'function') {
        onLine(line)
      }

      s = s.substring(n + EOL.length)
      n = s.indexOf(EOL)
    }

    return s
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Unknown error', { cause: error })
  }
}
export default processLineBuffer
