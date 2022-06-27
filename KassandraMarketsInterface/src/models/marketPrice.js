const Moralis = require("moralis/node");

class MarketPrice {
    constructor(exchange, data) {
        this.exchange = exchange;
        this.symbol = data.symbol;
        this.time = data.tradeTime;
        this.price = data.price;
    }

    async saveData (prices) {
        try {
            let MarketObj = Moralis.Object.extend("Prices");
            let query = new Moralis.Query(MarketObj);
            query.equalTo("exchange", this.exchange);
            let results = await query.find();
    
            if (results.length > 0) {
                let result = results[0];
                result.set("exchange", this.exchange);
                result.set("prices", prices);
                result.save();
            } else {
                let marketObj = new MarketObj();
    
                marketObj.set("exchange", this.exchange);
                marketObj.set("prices", prices);
                marketObj.save();
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    MarketPrice
};
