const Moralis = require("moralis/node");
const { Market } = require('../models/market');
const { Markets } = require('../models/markets');
const { MarketPrice } = require('../models/marketPrice');
const { MarketInformation } = require("../models/marketInformation");
const { Price } = require('../models/price');
const { PriceData } = require('../models/priceData');
const BinanceInterface = require('binance-api-node');
const binance = BinanceInterface.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
  });

const serverUrl = "https://dqywxuqq3yjn.usemoralis.com:2053/server";
const appId = "QHKl8mDT6Uaw7D6RMJIzgSpiAqksNBLO0OPLECN5";

Moralis.start({ serverUrl, appId });

class Binance {
    constructor() {
        this.name = 'Binance';
        this.marketsList = [];
        this.Market = new Market();
        this.initializeSockets();
    }

    async markets() {
        try {
            const exchangeInfo = await binance.exchangeInfo();
            var markets = exchangeInfo.symbols;
            var tempList = []; // Protect against dyamic data changing during operation.

            Array.from(markets).forEach(function(market) {
                tempList.push(new MarketInformation(market.baseAsset, market.quoteAsset, market.symbol));
            });

            this.marketsList = tempList;
            this.Market.saveExchangeMarkets(this.name, this.marketsList);
        } catch (error) {
            console.log(error);
        }

        return new Markets(this.name, this.marketsList);
    }

    async initializeSockets() {
        var marketArray = [];
        var updates = {};
        var prices = [];
        var updateTime = Date.now();
        var priceUpdateTime = Date.now();

        if (this.marketsList.length === 0) {
            await this.markets();
        }

        this.marketsList.forEach((element) => {
            marketArray.push(element.symbol);
        })

        binance.ws.trades(marketArray, (trades) => {
            var market = this.marketsList.find(record => record.symbol === trades.symbol);

            var currentPrice = new MarketPrice(trades);
            updates[market.market] = currentPrice;

            // Update the current market price 2 x per second.
            if (Date.now() > updateTime + 500) {
                updateTime = Date.now();
                new Price().saveData(this.name, updates);
            }

            var price;
            if (price = prices.find(record => record.symbol  === market.market)) {
                price.update(trades);
            } else {
                price = new PriceData(market.market, trades);
                prices.push(price);
            }

            if (Date.now() > priceUpdateTime + 60000) {
                priceUpdateTime = Date.now();
                new Price().saveData(this.name, prices, false);

                prices = [];
            }
        });
    }
}

module.exports = {
    Binance,
};
