const Redis = require("redis");
const Bluebird = require("bluebird");
const client = Redis.createClient(require("./config").redisPort);
Bluebird.promisifyAll(client, {
  suffix: "Async",
});

module.exports = client;
