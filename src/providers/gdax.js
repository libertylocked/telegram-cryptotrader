const fetch = require("isomorphic-fetch");

const SUPPORTED_BASE_CURRENCIES = [
  "BTC", "ETH", "LTC",
];
const SUPPORTED_QUOTE_CURRENCIES = [
  "USD", "GBP", "EUR",
];

module.exports = (base, quote) => {
  if (!SUPPORTED_BASE_CURRENCIES.includes(base)) {
    return Promise.reject(new Error("Base currency not supported by GDAX"));
  }
  if (!SUPPORTED_QUOTE_CURRENCIES.includes(quote)) {
    return Promise.reject(new Error("Quote currency not supported by GDAX"));
  }

  const requestURL = `https://api.gdax.com/products/${base}-${quote}/ticker`;
  return fetch(requestURL)
    .then((resp) => {
      if (resp.status != 200) throw new Error(resp.status);
      return resp.json();
    })
    .then((data) => {
      return Promise.resolve(parseFloat(data.price));
    });
};
