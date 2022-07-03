const Moralis = require("moralis/node");
const { RecordDefinitions } = require("./recordDefinitions");

const Definitions = new RecordDefinitions();

class Price {
    constructor(exchange, prices) {
        this.exchange = exchange;
        this.prices = prices !== undefined ? prices : [];
    }

    async getPrice(exchange) {
        try {
            let MarketObj = Moralis.Object.extend(Definitions.PriceString);
            let query = new Moralis.Query(MarketObj);
            query.equalTo(Definitions.exchangeString, exchange);
            var record = await query.first();

            if (record !== undefined) {
                return new Price(exchange, record.get(Definitions.pricesString));
            } else {
                return new Price(exchange);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async getPrices(exchange) {
        try {
            let PriceObj = Moralis.Object.extend(Definitions.PricesString);
            let query = new Moralis.Query(PriceObj);
            query.equalTo(Definitions.exchangeString, exchange);
            query.descending(Definitions.createdAtString);
            var record = await query.first();

            if (record !== undefined) {
                return new Price(exchange, record.get(Definitions.pricesString));
            } else {
                return new Price(exchange);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveData (exchange, prices, isCurrentPrice = true) {
        try {
            let MarketObj = Moralis.Object.extend(isCurrentPrice ? Definitions.PriceString : Definitions.PricesString);
            let query = new Moralis.Query(MarketObj);
            query.equalTo(Definitions.exchangeString, exchange);
            let results = await query.find();
    
            if (results.length > 0 && isCurrentPrice) {
                let result = results[0];
                result.set(Definitions.exchangeString, exchange);
                result.set(Definitions.pricesString, prices);
                result.save();
            } else {
                let marketObj = new MarketObj();
                marketObj.set(Definitions.exchangeString, exchange);
                marketObj.set(Definitions.pricesString, prices);
                marketObj.save();
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Price
};
