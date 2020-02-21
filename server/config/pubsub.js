import { RedisPubSub } from "graphql-redis-subscriptions";
import { redisHost, redisPort, redisPass } from "../config/config";
const Redis = require("ioredis");

const options = {
  host: redisHost,
  port: redisPort,
  password: redisPass,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
