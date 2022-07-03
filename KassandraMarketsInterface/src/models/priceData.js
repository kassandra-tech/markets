class PriceData {
    constructor(market, data) {
        this.symbol = market;
        this.price = data.price;
        this.lowPrice = data.price;
        this.highPrice = data.price;
        this.buyVolume = 0.0;
        this.sellVolume = 0.0;
        this.volume = 0.0;

        this.update(data);
    }

    update(data) {
        try {
            var price = data.price;
            var amount = data.quantity;
            var isBuy = data.isBuyerMaker;

            this.price = (parseFloat(this.lowPrice) + parseFloat(this.highPrice)) / 2;

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
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    PriceData
};
