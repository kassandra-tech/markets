class MarketPrice {
    constructor(data) {
        this.time = data.tradeTime;
        this.price = data.price;
    }
}

module.exports = {
    MarketPrice
};
