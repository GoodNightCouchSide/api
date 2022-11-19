import chalk from 'chalk'
import { Request, Response, NextFunction } from 'express'

export default class Logging {
  public static log = (args: unknown) => this.info(args)
  // eslint-disable-next-line no-console
  public static debug = (args: unknown) => console.log(chalk.white(`[${new Date().toLocaleString()}] [DEBUG] `, typeof args === 'string' ? chalk.whiteBright(args) : args))
  // eslint-disable-next-line no-console
  public static info = (args: unknown) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `, typeof args === 'string' ? chalk.blueBright(args) : args))
  // eslint-disable-next-line no-console
  public static warn = (args: unknown) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `, typeof args === 'string' ? chalk.yellowBright(args) : args))
  // eslint-disable-next-line no-console
  public static error = (args: unknown) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `, typeof args === 'string' ? chalk.redBright(args) : args))
}

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}]`)
  res.on('finish', () => {
    Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
  })
  next()
}
