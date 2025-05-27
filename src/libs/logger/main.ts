import { defineProperties } from './utils'

type Code =
| 31
| 32
| 33
| 34
| 37
| 39
| 90
| 91

type Style<T extends Code> = `\u001B[${T}m`

type Red = Style<31>
type Green = Style<32>
type Yellow = Style<33>
type Blue = Style<34>
type White = Style<37>
type Grey = Style<90>
type RedBright = Style<91>

type Close = Style<39>

type Color =
| Red
| Green
| Yellow
| Blue
| White
| Grey
| RedBright

const color = <T extends Code>(
  code: T
) => `\u001B[${code}m` as const

const red = color(31)
const green = color(32)
const yellow = color(33)
const blue = color(34)
const white = color(37)
const grey = color(90)
const redBright = color(91)

const chalk = <T extends Color>(
  message: string,
  color: T,
  close: Close = '\u001B[39m'
): `${T}${string}${Close}` => {
  const coloredMessage = message
    .split('\n')
    .map((line) => {
      line = color + line
      line = line.endsWith('\r') ? line.slice(0, -1) + close + '\r' : line + close
      return line
    }).join('\n') as `${T}${string}${Close}`

  return coloredMessage
}

export const fatal = (message: string): void => {
  console.log(chalk(message, redBright))
}

export const error = (message: string): void => {
  console.log(chalk(message, red))
}

export const warn = (message: string): void => {
  console.log(chalk(message, yellow))
}

export const info = (message: string): void => {
  console.log(chalk(message, blue))
}

export const success = (message: string): void => {
  console.log(chalk(message, green))
}

export const debug = (message: string): void => {
  console.log(chalk(message, grey))
}

export const trace = (message: string): void => {
  console.log(chalk(message, white))
}

export const log = (message: string): void => {
  console.log(message)
}

const main = (
  ...args: string[]
): void => {
  console.log(...args)
}

defineProperties(main, {
  fatal,
  error,
  warn,
  info,
  success,
  debug,
  trace,
  log
})

export interface Logger {
  (...args: string[]): void
  fatal: typeof fatal
  error: typeof error
  warn: typeof warn
  info: typeof info
  success: typeof success
  debug: typeof debug
  trace: typeof trace
  log: typeof log
}

export const logger = main as Logger
