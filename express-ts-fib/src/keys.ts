export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT)
    : 8080;
export const PG_USER = process.env.PG_USER;
export const PG_HOST = process.env.PG_HOST;
export const PG_DB = process.env.PG_DB;
export const PG_PORT = process.env.PG_PORT
    ? parseInt(process.env.PG_PORT)
    : 3000;
export const PG_PASSWORD = process.env.PG_PASSWORD;
