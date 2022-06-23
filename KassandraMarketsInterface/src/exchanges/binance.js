const { MarketPrice } = require('../models/marketPrice');
const { Markets } = require('../models/markets');
const BinanceInterface = require('binance-api-node');
const binance = BinanceInterface.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
  });
const Moralis = require("moralis/node");

const serverUrl = "https://dqywxuqq3yjn.usemoralis.com:2053/server";
const appId = "QHKl8mDT6Uaw7D6RMJIzgSpiAqksNBLO0OPLECN5";

Moralis.start({ serverUrl, appId });

class Binance {
    constructor() {
        this.name = 'Binance';
        this.trades = null;
        this.initializeSockets();
    }

    async markets() {
        const time = Date.now();
        
        try {
            const exchangeInfo = await binance.exchangeInfo();
            var markets = exchangeInfo.symbols;
            var marketsList = [];

            Array.from(markets).forEach(function(market) {
                var data = {};
                data['market'] = market.baseAsset + '-' + market.quoteAsset;
                data['name'] = market.symbol;
                data['currency'] = market.baseAsset;
                data['quoteCurrency'] = market.quoteAsset;
                marketsList.push(data);
            });

            var market = new Markets(this.name, marketsList, time);
        } catch (error) {
            console.log("Error: " + error);
        }

        return market;
    }

    async initializeSockets() {
        let markets = Moralis.Object.extend(this.name + "Markets");
        let query = new Moralis.Query(markets);
        query.descending("createdAt");
        let results = await query.first();
        let data = results.get("markets");
        let marketArray = [];
        let updates = {};
        let updateTime = Date.now();

        // Add all markets to add to trades watch.
        data.forEach((element) => {
            marketArray.push(element.name);
        })

        binance.ws.trades(marketArray, (trades) => {
            let data = new MarketPrice(this.name, trades);
            updates[data.symbol] = data;

             if (Date.now() > updateTime + 500) {
                updateTime = Date.now();
                data.saveData(updates);
             }
        });
    }
}

module.exports = {
    Binance,
};
