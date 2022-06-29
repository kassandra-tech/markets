const Moralis = require("moralis/node");
const { PriceRecord } = require("./priceRecord");

class PriceData {
    constructor(exchange, market, data) {
        this.exchange = exchange;
        this.symbol = market;
        this.lowPrice = data.price;
        this.highPrice = data.price;
        this.buyVolume = 0.0;
        this.sellVolume = 0.0;
        this.volume = 0.0;
        this.prices = [];

        this.update(data);
    }

    update(data) {
        var price = data.price;
        var amount = data.quantity;
        var isBuy = data.isBuyerMaker;
        var time = data.tradeTime;

        this.prices.push(new PriceRecord(price, amount, isBuy, time));

        if (price < this.lowPrice) {
            this.lowPrice = price;
        } else if (price > this.highPrice) {
            this.highPrice = price;
        }

        if (isBuy) {
            this.buyVolume = parseFloat(this.buyVolume) + parseFloat(amount);
        } else {
            this.sellVolume = parseFloat(this.sellVolume) + parseFloat(amount);
        }

        this.volume = parseFloat(this.volume) + parseFloat(amount);
    }

    async saveData (prices) {
        try {
            let MarketObj = Moralis.Object.extend("Prices");
            let marketObj = new MarketObj();
    
            marketObj.set("exchange", this.exchange);
            marketObj.set("prices", prices);
            marketObj.save();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    PriceData
};
