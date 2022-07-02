const Moralis = require("moralis/node");

const CurrenciesString = "Currencies";
const currenciesString = "currencies";

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
            var CurrencyObj = Moralis.Object.extend(CurrenciesString);
            let currencyObj = new CurrencyObj();
            currencyObj.set(currenciesString, currencies);
            currencyObj.save();
        } catch (error) {
            console.log(error);
        }
      };

    async getCurrencies() {
        try {
        let MarketObj = Moralis.Object.extend(CurrenciesString);
        let query = new Moralis.Query(MarketObj);
        query.descending("createdAt");
        var record = await query.first();
    
        return record.get(currenciesString);
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = {
    Currency
};
