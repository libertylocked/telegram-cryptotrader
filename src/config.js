const Dotenv = require("dotenv");

Dotenv.config();
const botToken = process.env.BOT_TOKEN;
const redisPort = process.env.REDIS_PORT || "6379";

module.exports = {
  botToken,
  redisPort,
};
