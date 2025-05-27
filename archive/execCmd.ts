import { type ExecOptions, exec } from 'node:child_process'

import parseStdoutLines from './parseStdoutLines'

export interface ExecResult {
  stderr: string
  stderrLines: string[]
  stdout: string
  stdoutLines: string[]
}

const execCmd = (
  command: string,
  args: string[] = [],
  options: ExecOptions = {}
  /* eslint-disable-next-line @typescript-eslint/promise-function-async */
): Promise<ExecResult> => {
  const promise = new Promise<ExecResult>((resolve, reject) => {
    try {
      const cmd = args.length > 0 ? `${command} ${args.join(' ')}` : command

      exec(cmd, options, (error, stdout, stderr) => {
        if (error !== null && error !== undefined) {
          reject(error)
        }

        const out = stdout.trim()
        const outLines = parseStdoutLines(out)

        const err = stderr.trim()
        const errLines = parseStdoutLines(err)

        resolve({
          stdout: out,
          stdoutLines: outLines,
          stderr: err,
          stderrLines: errLines
        })
      })
    } catch (error) {
      reject(error)
    }
  })

  return promise
}

export default execCmd
