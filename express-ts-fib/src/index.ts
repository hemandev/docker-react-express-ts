import express from 'express';
import redis from 'redis';
import 'reflect-metadata';
import util from 'util';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Value } from './entity/Value';
import * as KEYS from './keys';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const setupRedis = async () => {
    const redisClient = redis.createClient({
        host: KEYS.REDIS_HOST,
        port: KEYS.REDIS_PORT,
        retry_strategy: () => 1000
    });

    const redisPublisher = redisClient.duplicate();
    return { redisClient, redisPublisher };
};

(async () => {
    try {
        const connection = await createConnection({
            type: 'postgres',
            host: KEYS.PG_HOST,
            port: KEYS.PG_PORT,
            username: KEYS.PG_USER,
            password: KEYS.PG_PASSWORD,
            database: KEYS.PG_DB,
            entities: [Value],
            logging: false,
            synchronize: true
        });

        const { redisClient, redisPublisher } = await setupRedis();

        app.get('/', (req, res) => {
            res.send('Hi');
        });

        app.get('/values/all', async (req, res) => {
            console.log('Inside');
            let allValues = await connection.manager.find(Value);
            const indices = allValues.map(value => value.index);

            res.send(indices.toString());
        });

        app.get('/values/current', async (req, res) => {
            const hgetAll = util.promisify(redisClient.hgetall).bind(redisClient);
            try {
                const values = await hgetAll('values');
                res.send(values);
            }
            catch(err) {
                throw err;
            }
            
        });

        app.post('/values', async (req, res) => {
            const index = req.body.index as string;
            console.log('Inside values', JSON.stringify(req.body));
            if (parseInt(index) > 40) {
                return res.status(422).send('Index too high');
            }

            redisClient.hset('values', index, 'Nothing yet!');
            redisPublisher.publish('insert', index);
            try {
                let value = new Value();
                value.index = parseInt(index);
                await connection.manager.save(value);
                console.log('Value saved successfully!');
                res.send({ success: true });
            } catch (err) {
                throw err;
            }
        });
    } catch (err) {
        throw err;
    }
})();

app.listen(5000, () => {
    console.log('Magic happens on 4000');
});
