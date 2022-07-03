class PriceRecord {
    constructor(price, amount, isBuy, time) {
        this.price = price;
        this.amount = amount;
        this.isBuy = isBuy;
        this.time = time;
    }
}

module.exports = {
    PriceRecord
};
