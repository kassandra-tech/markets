const { Market } = require('../models/market');
const { Markets } = require('../models/markets');
const { MarketInformation } = require("../models/marketInformation");
const CoinbaseInterface = require('coinbase-pro-node');
const coinbase = new CoinbaseInterface.default();

class Coinbase {
    constructor() {
        this.name = 'Coinbase';
        this.marketsList = [];
    }

    async markets() {
        try {
            const markets = await coinbase.rest.product.getProducts();
            var tempList = []; // Protect against dyamic data changing during operation.
            Array.from(markets).forEach(function(market) {
                tempList.push(new MarketInformation(market.base_currency, market.quote_currency, market.display_name));
            });
            this.marketsList = tempList;
            new Market().saveExchangeMarkets(this.name, this.marketsList);
        } catch (error) {
            console.log(error);
        }

        return new Markets(this.name, this.marketsList);;
    }
}

module.exports = {
    Coinbase,
};
