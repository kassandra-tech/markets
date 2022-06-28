const express = require("express");
const router = express.Router();
const {Binance} = require('../exchanges/binance');
const {Coinbase} = require('../exchanges/coinbase-pro');
const { Currency } = require("../models/currency");
const { Market } = require("../models/market");

const binance = new Binance();
const coinbase = new Coinbase();

router.get('/currencies', async function(request, response) {
    return response.json(await new Currency().getCurrencies());
});

router.get('/markets', async function(request, response) {
    return response.json(await new Market().getMarkets());
});

router.post('/markets', async function(request, response) {
    var MarketsList = [];
    var filter = request.query.exchangesFilter;

    if (!filter || filter.length === 0 || filter.includes(binance.name)) {
        var marketsList = await binance.markets();
        MarketsList.push(marketsList);
    }
    
    if (!filter || filter.length === 0 || filter.includes(coinbase.name)) {
        var marketsList = await coinbase.markets();
        MarketsList.push(marketsList);
    }

    return response.json(await marketsList.saveData(MarketsList));
});

module.exports = router;
