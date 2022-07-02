const Moralis = require("moralis/node");

const MarketsString = "Markets";
const marketsString = "markets";

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
            var MarketsObj = Moralis.Object.extend(MarketsString);
            let marketsObj = new MarketsObj();        
            marketsObj.set(marketsString, markets);
            marketsObj.save();

            return marketsObj;
        } catch (error) {
            console.log(error);
        }
      };

      async getMarkets() {
        try {
            let MarketObj = Moralis.Object.extend(MarketsString);
            let query = new Moralis.Query(MarketObj);
            query.descending("createdAt");
            var record = await query.first();
        
            return record.get(marketsString);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Market
};
