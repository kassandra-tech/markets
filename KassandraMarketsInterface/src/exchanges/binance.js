const BinanceInterface = require('binance-api-node');
const { Markets } = require('../models/markets');
const binance = BinanceInterface.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET
  });

class Binance {
    constructor() {
        this.name = 'Binance';
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
        } catch (error) {
            console.log("Error: " + error);
        }

        var market = new Markets(this.name, marketsList, time);

        return market;
    }
}

module.exports = {
    Binance,
};
