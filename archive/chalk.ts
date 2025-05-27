type Color = `\u001B[${number}m`

const chalk = (
  message: string,
  color: Color,
  close: Color = '\u001B[39m'
): string => {
  const coloredMessage = message
    .split('\n')
    .map((line) => {
      line = color + line

      line = line.endsWith('\r')
        ? line.slice(0, -1) + close + '\r'
        : line + close

      return line
    }).join('\n')

  return coloredMessage
}

export default chalk
