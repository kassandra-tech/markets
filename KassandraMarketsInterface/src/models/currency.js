const Moralis = require("moralis/node");
const { RecordDefinitions } = require("./recordDefinitions");

const Definitions = new RecordDefinitions();

class Currency {
    constructor(currency, exchange) {
        this.name = currency;
        this.exchanges = [];
        this.exchanges.push(exchange);
    }

    updateExchanges(exchange) {
        if (!this.exchanges.includes(exchange)) {
            this.exchanges.push(exchange);
        }
    }

    async saveData(currencies) {
        try {
            var CurrencyObj = Moralis.Object.extend(Definitions.CurrenciesString);
            let currencyObj = new CurrencyObj();
            currencyObj.set(Definitions.currenciesString, currencies);
            currencyObj.save();
        } catch (error) {
            console.log(error);
        }
      };

    async getCurrencies() {
        try {
        let MarketObj = Moralis.Object.extend(Definitions.CurrenciesString);
        let query = new Moralis.Query(MarketObj);
        query.descending(Definitions.createdAtString);
        var record = await query.first();
    
        return record.get(Definitions.currenciesString);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Currency
};
