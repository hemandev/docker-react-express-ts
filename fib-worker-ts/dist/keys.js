"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_HOST = process.env.REDIS_HOST;
exports.REDIS_PORT = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT)
    : 8080;
