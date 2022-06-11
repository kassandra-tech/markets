class Markets {
    constructor(exchange, markets, time) {
        this.exchange = exchange;
        this.markets = markets;
        this.time = Math.round(Date.now() - time);
    }
}

module.exports = {
    Markets
};
