"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const ApiError_1 = require("../ApiError");
const Logging_1 = __importDefault(require("../Logging"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    console.log(error);
    if (!(error instanceof ApiError_1.ApiError)) {
        const statusCode = error instanceof mongoose_1.Error ? http_status_1.default.BAD_REQUEST : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = String(http_status_1.default[statusCode]);
        error = new ApiError_1.ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    //   if (config.env === 'production' && !err.isOperational) {
    //     statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    //     message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    //   }
    res.locals.errorMessage = err.message;
    const response = {
        code: statusCode,
        message
        // ...(config.env === 'development' && { stack: err.stack })
    };
    //   if (config.env === 'development') {
    Logging_1.default.error(err);
    //   }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
