const fetch = require("isomorphic-fetch");
const redisClient = require("../redis-client");

const SUPPORTED_BASE_CURRENCIES = [
  "BTC", "ETH", "LTC",
];
const SUPPORTED_QUOTE_CURRENCIES = [
  "USD", "GBP", "EUR",
];

module.exports = (base, quote) => {
  const redisKey = `GDAX:${base}-${quote}`;
  const requestURL = `https://api.gdax.com/products/${base}-${quote}/ticker`;
  if (!SUPPORTED_BASE_CURRENCIES.includes(base)) {
    throw new Error("Base currency not supported by GDAX");
  }
  if (!SUPPORTED_QUOTE_CURRENCIES.includes(quote)) {
    throw new Error("Quote currency not supported by GDAX");
  }

  return redisClient.getAsync(redisKey).then((data) => {
    if (data != null) {
      return parseFloat(data);
    } else {
      return fetch(requestURL).then((resp) => {
        if (resp.status != 200) throw new Error(resp.status);
        return resp.json();
      }).then((data) => {
        const price = parseFloat(data.price);
        redisClient.setex(redisKey, 30, price);
        return price;
      });
    }
  });
};
