const { MarketPrice } = require('../models/marketPrice');
const { Markets } = require('../models/markets');
const { PriceData } = require('../models/priceData');
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
        this.marketsList = [];
        this.initializeSockets();
    }

    async markets() {
        try {
            const exchangeInfo = await binance.exchangeInfo();
            var markets = exchangeInfo.symbols;
            var tempList = [];

            Array.from(markets).forEach(function(market) {
                var data = {};
                data['market'] = market.baseAsset + '-' + market.quoteAsset;
                data['name'] = market.symbol;
                data['currency'] = market.baseAsset;
                data['quoteCurrency'] = market.quoteAsset;
                tempList.push(data);
            });

            this.marketsList = tempList;
            var market = new Markets(this.name, this.marketsList);
            market.saveExchangeMarkets();
        } catch (error) {
            console.log("Error: " + error);
        }

        return market;
    }

    async initializeSockets() {
        var markets = Moralis.Object.extend(this.name + "Markets");
        var query = new Moralis.Query(markets);
        query.descending("createdAt");
        var results = await query.first();

        var marketArray = [];
        var updates = {};
        var prices = [];
        var updateTime = Date.now();
        var priceUpdateTime = Date.now();

        if (results !== undefined) {
            this.marketsList = results.get("markets");

            // Add all markets to add to trades watch.
            this.marketsList.forEach((element) => {
                marketArray.push(element.name);
            })
            
        } else {
            this.markets();
        }

        binance.ws.trades(marketArray, (trades) => {
            var market = this.marketsList.find(record => record.name === trades.symbol);

            var currentPrice = new MarketPrice(this.name, market.market, trades);
            updates[currentPrice.symbol] = currentPrice;

            if (Date.now() > updateTime + 500) {
                updateTime = Date.now();
                currentPrice.saveData(updates);
            }

            var price;
            if (price = prices.find(record => record.symbol  === market.market)) {
                price.update(trades);
            } else {
                price = new PriceData(this.name, market.market, trades);
                prices.push(price);
            }

            if (Date.now() > priceUpdateTime + 60000) {
                priceUpdateTime = Date.now();
                price.saveData(prices);

                prices = [];
            }
        });
    }
}

module.exports = {
    Binance,
};
