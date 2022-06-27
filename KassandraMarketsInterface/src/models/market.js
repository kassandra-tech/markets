const Moralis = require("moralis/node");

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
            var MarketsObj = Moralis.Object.extend("Markets");
            let marketsObj = new MarketsObj();        
            marketsObj.set("markets", markets);
            marketsObj.save();

            return marketsObj;
        } catch (error) {
            console.log(error);
        }
      };
}

module.exports = {
    Market
};
