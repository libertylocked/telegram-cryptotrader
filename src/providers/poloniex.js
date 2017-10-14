const fetch = require("isomorphic-fetch");
const redisClient = require("../redis-client");

// Poloniex API is kind of different that it returns ticker for all markets
// we cache the entire ticker data

const getLastPrice = (tickerData, base, quote) => {
  return parseFloat(tickerData[`${quote}_${base}`].last);
};

module.exports = (base, quote) => {
  const redisKey = `Poloniex:${base}-${quote}`;
  const requestURL = "https://poloniex.com/public?command=returnTicker";

  return redisClient.getAsync(redisKey).then((tickerData) => {
    if (tickerData != null) {
      return getLastPrice(JSON.parse(tickerData), base, quote);
    } else {
      return fetch(requestURL).then((resp) => {
        if (resp.status != 200) throw new Error(resp.status);
        return resp.json();
      }).then((tickerData) => {
        // cache the entire ticker data
        redisClient.setex(redisKey, 30, JSON.stringify(tickerData));
        return getLastPrice(tickerData, base, quote);
      });
    }
  });
};
