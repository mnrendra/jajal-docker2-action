import type { SpawnOptionsWithoutStdio } from 'node:child_process'

import type { ExecResult } from './execCmd'

import { spawn } from 'node:child_process'

import parseStdoutLines from './parseStdoutLines'
import processLineBuffer from './processLineBuffer'

interface SpawnResult extends ExecResult {
  code: number
}

export interface SpawnCmdOptions extends SpawnOptionsWithoutStdio {
  input?: Buffer
}

const spawnCmd = (
  command: string,
  args: string[] = [],
  options: SpawnCmdOptions = {}
  /* eslint-disable-next-line @typescript-eslint/promise-function-async */
): Promise<SpawnResult> => {
  const promise = new Promise<SpawnResult>((resolve, reject) => {
    try {
      const cp = spawn(command, args, options)

      let stderr = ''
      cp.stdout.on('data', (data: Buffer) => {
        stderr = processLineBuffer(data, stderr)
      })

      let stdout = ''
      cp.stderr.on('data', (data: Buffer) => {
        stdout = processLineBuffer(data, stdout)
      })

      cp.on('error', (error) => {
        cp.removeAllListeners()
        reject(error)
      })

      cp.on('close', (code: number) => {
        cp.removeAllListeners()

        const out = stdout.trim()
        const outLines = parseStdoutLines(out)

        const err = stderr.trim()
        const errLines = parseStdoutLines(err)

        resolve({
          code,
          stdout: out,
          stdoutLines: outLines,
          stderr: err,
          stderrLines: errLines
        })
      })

      if (options.input !== undefined) {
        cp.stdin.end(options.input)
      }
    } catch (error) {
      reject(error)
    }
  })

  return promise
}

export default spawnCmd
