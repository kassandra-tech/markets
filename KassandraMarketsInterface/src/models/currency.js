const Moralis = require("moralis/node");

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
            var CurrencyObj = Moralis.Object.extend("Currencies");
                let currencyObj = new CurrencyObj();        
                currencyObj.set("currencies", currencies);
                currencyObj.save();
        } catch (error) {
            console.log(error);
        }
      };

    async getCurrencies() {
        let MarketObj = Moralis.Object.extend("Currencies");
        let query = new Moralis.Query(MarketObj);
        query.descending("createdAt");

        var testo = await query.first();
    
        return testo.get("currencies");
    }
}

module.exports = {
    Currency
};
