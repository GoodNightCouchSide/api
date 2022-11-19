import chalk from 'chalk';
import { Request, Response, NextFunction } from 'express';

export default class Logging {
  public static log = (args: any) => this.info(args);
  public static debug = (args: any) => console.log(chalk.white(`[${new Date().toLocaleString()}] [DEBUG] `, typeof args === 'string' ? chalk.whiteBright(args) : args));
  public static info = (args: any) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] `, typeof args === 'string' ? chalk.blueBright(args) : args));
  public static warn = (args: any) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `, typeof args === 'string' ? chalk.yellowBright(args) : args));
  public static error = (args: any) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] `, typeof args === 'string' ? chalk.redBright(args) : args));
}

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);
  res.on('finish', () => {
    Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
  });
  next();
};
