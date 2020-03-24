import redis from 'redis';
import { REDIS_HOST, REDIS_PORT } from './keys';
import { fib } from './utils';

const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

sub.on('message', (channel, message) => {
    console.log('message is ', message);
    const fibVal = fib(parseInt(message)).toString();
    console.log('fibval', fibVal);
    redisClient.hset('values', message, fibVal);
});
sub.subscribe('insert');
