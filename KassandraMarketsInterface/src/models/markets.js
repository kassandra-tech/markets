const Moralis = require("moralis/node");

class Markets {
    constructor(exchange, markets, time) {
        this.exchange = exchange;
        this.markets = markets;
        this.time = Math.round(Date.now() - time);
    }

    saveData = async () => {
        var MarketObj = Moralis.Object.extend(this.exchange + "Markets");
        var marketObj = new MarketObj();

        marketObj.set("exchange", this.exchange);
        marketObj.set("markets", this.markets);
        marketObj.set("time", this.time);
 
        await marketObj.save();
        console.log("Data Saved");
      };
}

module.exports = {
    Markets
};
