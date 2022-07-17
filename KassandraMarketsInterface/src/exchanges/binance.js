const Moralis = require("moralis/node");
const { Market } = require('../models/market');
const { Markets } = require('../models/markets');
const { MarketPrice } = require('../models/marketPrice');
const { MarketInformation } = require("../models/marketInformation");
const { Price } = require('../models/price');
const { PriceData } = require('../models/priceData');
const BinanceInterface = require('binance-api-node');
const { MarketRecord } = require("../models/marketRecord");
const binance = BinanceInterface.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
  });

class Binance {
    constructor() {
        this.name = 'Binance';
        this.currentPrices = {};
        this.marketPrices = [];
        this.marketsList = [];

        this.Market = new Market();
        this.MarketRecord = new MarketRecord();
        this.initializeSockets();
    }

    async markets() {
        try {
            const exchangeInfo = await binance.exchangeInfo();
            var markets = exchangeInfo.symbols;
            var tempList = []; // Protect against dyamic data changing during operation.

            Array.from(markets).forEach(market => {
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
        var updateTime = Date.now();
        var priceUpdateTime = Date.now();
        var marketsUpdateTime = Date.now();

        if (this.marketsList.length === 0) {
            await this.markets();
        }

        this.marketsList.forEach((element) => {
            marketArray.push(element.symbol);
        })

        binance.ws.trades(marketArray, (trades) => {
            var market = this.marketsList.find(record => record.symbol === trades.symbol);

            var currentPrice = new MarketPrice(trades);
            this.currentPrices[market.market] = currentPrice;

            // Update the current market price 2 x per second.
            if (Date.now() > updateTime + 500) {
                updateTime = Date.now();
                new Price().saveData(this.name, this.currentPrices);
            }

            var price;
            if (price = this.marketPrices.find(record => record.symbol  === market.market)) {
                price.update(trades);
            } else {
                price = new PriceData(market.market, trades);
                this.marketPrices.push(price);
            }

            if (Date.now() > priceUpdateTime + 60000) {
                priceUpdateTime = Date.now();
                new Price().saveData(this.name, this.marketPrices, false);

                this.marketPrices = [];
            }

            if (Date.now() > marketsUpdateTime + 300000) {
                marketsUpdateTime = Date.now();
                this.MarketRecord.getRecords(this.marketsList, this.currentPrices, 5);
            }
        });
    }
}

module.exports = {
    Binance,
};
