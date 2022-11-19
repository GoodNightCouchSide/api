"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logging {
}
exports.default = Logging;
_a = Logging;
Logging.log = (args) => _a.info(args);
Logging.debug = (args) => console.log(chalk_1.default.white(`[${new Date().toLocaleString()}] [DEBUG] `, typeof args === 'string' ? chalk_1.default.whiteBright(args) : args));
Logging.info = (args) => console.log(chalk_1.default.blue(`[${new Date().toLocaleString()}] [INFO] `, typeof args === 'string' ? chalk_1.default.blueBright(args) : args));
Logging.warn = (args) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}] [WARN] `, typeof args === 'string' ? chalk_1.default.yellowBright(args) : args));
Logging.error = (args) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}] [ERROR] `, typeof args === 'string' ? chalk_1.default.redBright(args) : args));
const logRequest = (req, res, next) => {
    Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        Logging.info(`Incomming -> Method: [${req.method}] - Url : [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });
    next();
};
exports.logRequest = logRequest;
