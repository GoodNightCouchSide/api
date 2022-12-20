import chalk from 'chalk'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/config'

export default class Logging {
  public static log = (args: unknown) => this.info(args)
  public static debug = (args: unknown) =>
    // eslint-disable-next-line no-console
    console.log(
      chalk.white(
        `[${new Date().toLocaleString()}] [DEBUG] `,
        typeof args === 'string' ? chalk.whiteBright(args) : args
      )
    )
  public static info = (args: unknown) =>
    // eslint-disable-next-line no-console
    console.log(
      chalk.blue(
        `[${new Date().toLocaleString()}] [INFO] `,
        typeof args === 'string' ? chalk.blueBright(args) : args
      )
    )
  public static warn = (args: unknown) =>
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(
        `[${new Date().toLocaleString()}] [WARN] `,
        typeof args === 'string' ? chalk.yellowBright(args) : args
      )
    )
  public static error = (args: unknown) =>
    // eslint-disable-next-line no-console
    console.log(
      chalk.red(
        `[${new Date().toLocaleString()}] [ERROR] `,
        typeof args === 'string' ? chalk.redBright(args) : args
      )
    )
}

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  if (config.nodeEnv === 'test') return next()
  Logging.info(
    `Incoming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}]`
  )
  res.on('finish', () => {
    Logging.info(
      [
        `Outgoing -> Method: [${req.method}]`,
        `Url : [${req.url}]`,
        `IP: [${req.socket.remoteAddress}]`,
        `Status: [${res.statusCode}]`
      ].join(' - ')
    )
  })
  next()
}
