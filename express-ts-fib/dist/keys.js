"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_HOST = process.env.REDIS_HOST;
exports.REDIS_PORT = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT)
    : 8080;
exports.PG_USER = process.env.PG_USER;
exports.PG_HOST = process.env.PG_HOST;
exports.PG_DB = process.env.PG_DB;
exports.PG_PORT = process.env.PG_PORT
    ? parseInt(process.env.PG_PORT)
    : 3000;
exports.PG_PASSWORD = process.env.PG_PASSWORD;
