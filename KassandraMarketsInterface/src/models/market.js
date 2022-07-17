const Moralis = require("moralis/node");
const { Currency } = require("./currency");
const { RecordDefinitions } = require("./recordDefinitions");

const Definitions = new RecordDefinitions();

class Market {
    constructor(market, exchange) {
        this.name = market;
        this.exchanges = [];
        this.exchanges.push(exchange);
    }

    updateExchanges(exchange) {
        if (!this.exchanges.includes(exchange)) {
            this.exchanges.push(exchange);
        }
    }

    async saveData(markets) {
        try {
            var MarketsObj = Moralis.Object.extend(Definitions.MarketsString);
            let marketsObj = new MarketsObj();        
            marketsObj.set(Definitions.marketsString, markets);
            marketsObj.save();

            return marketsObj;
        } catch (error) {
            console.log(error);
        }
      };

      async getMarkets() {
        try {
            let MarketObj = Moralis.Object.extend(Definitions.MarketsString);
            let query = new Moralis.Query(MarketObj);
            query.descending(Definitions.createdAtString);
            var record = await query.first();
        
            return record.get(Definitions.marketsString);
        } catch (error) {
            console.log(error);
        }
    }

    async saveExchangeMarkets(exchange, markets) {
        try {
            var MarketObj = Moralis.Object.extend(exchange + Definitions.MarketsString);
            var marketObj = new MarketObj();
            marketObj.set(Definitions.exchangeString, exchange);
            marketObj.set(Definitions.marketsString, markets);

            await marketObj.save();
        } catch (error) {
            console.log(error);
        }
    }

    async saveMarkets(exchangeMarkets) {
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

            return this.saveData(marketsCurrencyList);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Market
};
