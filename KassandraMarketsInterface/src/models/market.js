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

      async getMarkets() {
        let MarketObj = Moralis.Object.extend("Markets");
        let query = new Moralis.Query(MarketObj);
        query.descending("createdAt");

        var record = await query.first();
    
        return record.get("markets");
    }
}

module.exports = {
    Market
};
