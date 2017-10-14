const fetch = require("isomorphic-fetch");
const redisClient = require("../redis-client");

module.exports = (base, quote) => {
  const redisKey = `HitBTC:${base}-${quote}`;
  const requestURL = `https://api.hitbtc.com/api/1/public/${base}${quote}/ticker`;

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
