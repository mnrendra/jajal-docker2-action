const parseStdoutLines = (
  stdout: string
): string[] => {
  const stdoutLines = stdout
    .trim()
    .replace(/\r/g, '')
    .trim()
    .split(/\n/)

  return stdoutLines
}

export default parseStdoutLines
