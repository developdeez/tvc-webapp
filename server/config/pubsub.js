import { RedisPubSub } from "graphql-redis-subscriptions";
const Redis = require("ioredis");

const options = {
  host: process.env.REDISHOST,
  port: process.env.REDISPORT,
  password: process.env.REDISPASS,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
