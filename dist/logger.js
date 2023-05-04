"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const lodash_1 = __importDefault(require("lodash"));
const pino_1 = __importDefault(require("pino"));
const level = process.env.LOG_LEVEL;
const redact = [
    "MYSQL_PASSWORD",
    "STRIPE_SECRETKEY",
    "JWT_SECRET",
    "headers.authorization",
    "user.passcode",
    "user.lastName",
    "user.phoneNumber",
    "user.email",
];
const logPretty = process.env.LOG_PRETTY;
exports.Logger = !lodash_1.default.isNil(logPretty) && logPretty
    ? (0, pino_1.default)({
        level,
        redact,
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: true,
            },
        },
    })
    : (0, pino_1.default)({
        level,
        redact,
    });
