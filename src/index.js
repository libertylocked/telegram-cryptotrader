const Botgram = require("botgram");
const Dotenv = require("dotenv");

Dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Botgram(BOT_TOKEN);

bot.command("price", require("./commands/price"));
bot.command("providers", require("./commands/providers"));
bot.command("eth", require("./commands/eth"));
bot.command("help", "start", require("./commands/help"));
