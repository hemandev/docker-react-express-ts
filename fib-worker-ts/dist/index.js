"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var keys_1 = require("./keys");
var redisClient = redis_1.default.createClient({
    host: keys_1.REDIS_HOST,
    port: keys_1.REDIS_PORT,
    retry_strategy: function () { return 1000; }
});
var sub = redisClient.duplicate();
var fib = function (index) {
    if (index < 2) {
        return 1;
    }
    return fib(index) + fib(index - 1);
};
sub.on('message', function (channel, message) {
    redisClient.hset('values', message, fib(parseInt(message)).toString());
});
sub.subscribe('insert');
