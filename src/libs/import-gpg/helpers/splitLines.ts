const splitLines = (
  stdout: string,
  trim: boolean = false
): string[] =>
  stdout
    .split(/\n\r|\r\n|\r|\n/)
    .map((line) => trim ? line.trim() : line)

export default splitLines
