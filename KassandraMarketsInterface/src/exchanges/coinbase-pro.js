const { Markets } = require('../models/markets');
const CoinbaseInterface = require('coinbase-pro-node');
const coinbase = new CoinbaseInterface.default();

class Coinbase {
    constructor() {
        this.name = 'Coinbase';
    }

    async markets() {
        const time = Date.now();
        var market;

        try {
            const markets = await coinbase.rest.product.getProducts();
            var marketsList = [];
            Array.from(markets).forEach(function(market) {
                var data = {};
                data['market'] = market.base_currency + '-' + market.quote_currency;
                data['name'] = market.display_name;
                data['currency'] = market.base_currency;
                data['quoteCurrency'] = market.quote_currency;
                marketsList.push(data);
            });
            market = new Markets(this.name, marketsList);
            market.saveExchangeMarkets();
        } catch (error) {
            console.log("Error: " + error);
        }

        return market;
    }
}

module.exports = {
    Coinbase,
};
