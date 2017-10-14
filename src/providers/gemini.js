const fetch = require("isomorphic-fetch");
const redisClient = require("../redis-client");

const SUPPORTED_BASE_CURRENCIES = [
  "BTC", "ETH",
];
const SUPPORTED_QUOTE_CURRENCIES = [
  "USD",
];

module.exports = (base, quote) => {
  const redisKey = `Gemini:${base}-${quote}`;
  const requestURL = `https://api.gemini.com/v1/pubticker/${base}${quote}`;
  if (!SUPPORTED_BASE_CURRENCIES.includes(base)) {
    throw new Error("Base currency not supported by Gemini");
  }
  if (!SUPPORTED_QUOTE_CURRENCIES.includes(quote)) {
    throw new Error("Quote currency not supported by Gemini");
  }

  return redisClient.getAsync(redisKey).then((data) => {
    if (data != null) {
      return parseFloat(data);
    } else {
      return fetch(requestURL).then((resp) => {
        if (resp.status != 200) throw new Error(resp.status);
        return resp.json();
      }).then((data) => {
        const price = parseFloat(data.last);
        redisClient.setex(redisKey, 30, price);
        return price;
      });
    }
  });
};
