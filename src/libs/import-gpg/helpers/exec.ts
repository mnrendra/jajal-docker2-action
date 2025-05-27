import { type Result as ExecaResult, execa } from 'execa'

import splitLines from './splitLines'

interface Result extends ExecaResult<Record<any, unknown>> {
  stderrLines: string[]
  stdoutLines: string[]
}

interface Options {
  input?: Buffer | string
}

type Command =
| 'gpg'
| 'gpg-connect-agent'
| 'gpgconf'

const exec = async (
  command: Command,
  args: string[] = [],
  options: Options = {}
): Promise<Result> => {
  const result = await execa(command, args, options)

  const stderrLines = splitLines(result.stderr, true)
  const stdoutLines = splitLines(result.stdout, true)

  return {
    ...result,
    stderrLines,
    stdoutLines
  }
}

export default exec
