class MarketInformation {
    constructor(currency, quoteCurrency, symbol) {
        this.market = currency + '-' + quoteCurrency;
        this.symbol = symbol;
        this.currency = currency;
        this.quoteCurrency = quoteCurrency;
    }
}

module.exports = {
    MarketInformation
};
