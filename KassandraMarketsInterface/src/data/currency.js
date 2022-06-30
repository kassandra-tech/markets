const Moralis = require("moralis/node");

const CurrenciesString = "Currencies";
const currenciesString = "currencies";

class Currency {
    async saveCurrencies(currencies) {
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
        let MarketObj = Moralis.Object.extend(CurrenciesString);
        let query = new Moralis.Query(MarketObj);
        query.descending("createdAt");

        var testo = await query.first();
    
        return testo.get(currenciesString);
    }
}

module.exports = {
    Currency
};
