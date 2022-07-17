const Moralis = require("moralis/node");
const { RecordDefinitions } = require("./recordDefinitions");

const Definitions = new RecordDefinitions();

class Currency {
    constructor(currency, exchange) {
        this.symbol = currency;
        this.name = "";
        this.rank = "";
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
            var uniqueCurrencies = [];
            var uniqueCurrenciesObjects = [];

            let moralisObj = Moralis.Object.extend(Definitions.CurrencyInformationString);
            var query = new Moralis.Query(moralisObj);
            query.descending(Definitions.createdAtString);
            var record = await query.first();
            var info = record.get(Definitions.currenciesString);

            Array.from(currencies).forEach(currency => {
                var item = info.filter(item => item.Symbol === currency.symbol)[0];

                if (item !== undefined) {
                currency.name = item.Name;
                currency.rank = item.Rank;
                }

                if (!uniqueCurrencies.includes(currency.symbol)) {
                    uniqueCurrencies.push(currency.symbol);
                    uniqueCurrenciesObjects.push(currency);
                }
            });

            var CurrencyObj = Moralis.Object.extend(Definitions.CurrenciesString);
            let currencyObj = new CurrencyObj();
            currencyObj.set(Definitions.currenciesString, uniqueCurrenciesObjects);
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
