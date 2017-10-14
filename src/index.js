const Botgram = require("botgram");
const config = require("./config");

if (!config.botToken) {
  console.error("No bot token specified. Please set BOT_TOKEN in env");
  process.exit(1);
}

const bot = new Botgram(config.botToken);

bot.command("price", require("./commands/price"));
bot.command("providers", require("./commands/providers"));
bot.command("eth", require("./commands/eth"));
bot.command("help", "start", require("./commands/help"));
