"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const http_status_1 = require("http-status");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const ApiError_1 = require("./library/ApiError");
const Logging_1 = __importStar(require("./library/Logging"));
const error_1 = require("./library/middlewares/error");
const utils_1 = require("./library/utils");
const Event_1 = __importDefault(require("./routes/Event"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('connected to mongodb');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('Unable to connect to mongodb');
    Logging_1.default.error(error);
});
const StartServer = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use(Logging_1.logRequest);
    router.use(utils_1.apiRules);
    router.use('/event', Event_1.default);
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    router.use((req, res, next) => next(new ApiError_1.ApiError(http_status_1.NOT_FOUND, 'Not found')));
    router.use(error_1.errorConverter);
    router.use(error_1.errorHandler);
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on Port ${config_1.config.server.port}`));
};
