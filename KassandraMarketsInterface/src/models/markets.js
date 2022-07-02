const Moralis = require("moralis/node");
const { Currency } = require("./currency");
const { Market } = require("./market");

class Markets {
    constructor(exchange, markets) {
        this.exchange = exchange;
        this.markets = markets;
    }

    async saveExchangeMarkets() {
        try {
            var MarketObj = Moralis.Object.extend(this.exchange + "Markets");
            var marketObj = new MarketObj();
            marketObj.set("markets", this.markets);

            await marketObj.save();
        } catch (error) {
            console.log(error);
        }
    }

    async saveData(exchangeMarkets) {
        try {
            var currencyList = [];
            var marketsCurrencyList = [];
            Array.from(exchangeMarkets).forEach((market) => {
                var exchange = market.exchange;
                Array.from(market.markets).forEach((market) => {
                    var marketObj;
                    if (marketObj = marketsCurrencyList.find(exchangeMarket => exchangeMarket.name === market.market)) {
                        marketObj.updateExchanges(exchange);
                    } else {
                        marketsCurrencyList.push(new Market(market.market, exchange));
                    }

                    // Update currency list.
                    var marketList = market.market.split('-');
                    marketList.forEach((symbol) => {
                        var currency;
                        if (currency = currencyList.find(currency => currency.name === symbol)) {
                            currency.updateExchanges(exchange);
                        } else {
                            currencyList.push(new Currency(symbol, exchange));
                        }
                    });
                });
            });

            new Currency().saveData(currencyList);

            return new Market().saveData(marketsCurrencyList);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Markets
};
