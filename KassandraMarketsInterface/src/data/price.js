const Moralis = require("moralis/node");
const { PriceRecord } = require("../models/priceRecord");

class Price {
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

    async getPrice(exchange) {
        try {
            let MarketObj = Moralis.Object.extend("Price");
            let query = new Moralis.Query(MarketObj);
            query.equalTo("exchange", exchange);     
            var record = await query.first();

            if (record !== undefined) {
                return record.get("prices");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getPrices() {
        try {
            let PriceObj = Moralis.Object.extend("Prices");
            let query = new Moralis.Query(PriceObj);
            query.descending("createdAt");
            var record = await query.first();

            if (record !== undefined) {
                return record.get("prices");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Price
};
