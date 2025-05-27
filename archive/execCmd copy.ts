import { type ExecOptions, exec } from 'node:child_process'

interface Std {
  stderr: string
  stdout: string
}

const execCmd = (
  command: string,
  options: ExecOptions = {}
  /* eslint-disable-next-line @typescript-eslint/promise-function-async */
): Promise<Std> => {
  const promises = new Promise<Std>((resolve, reject) => {
    try {
      exec(command, options, (error, stdout, stderr) => {
        if (error !== null && error !== undefined) {
          reject(error)
        }

        resolve({
          stdout,
          stderr
        })
      })
    } catch (error) {
      reject(error)
    }
  })

  return promises
}

export default execCmd
