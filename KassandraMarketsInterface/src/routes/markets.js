const express = require("express");
const router = express.Router();
const {Binance} = require('../exchanges/binance');
const {Coinbase} = require('../exchanges/coinbase-pro');
const { Currency } = require("../models/currency");
const { Market } = require("../models/market");
const { Price } = require("../models/price");

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

    return response.json(await new Market().saveMarkets(MarketsList));
});

router.get('/price', async function(request, response) {
    var price = [];
    var filter = request.query.exchangesFilter;

    if (!filter || filter.length === 0 || filter.includes(binance.name)) {
        var marketsList = await new Price().getPrice(binance.name);
        price.push(marketsList);
    }
    
    if (!filter || filter.length === 0 || filter.includes(coinbase.name)) {
        var marketsList = await new Price().getPrice(coinbase.name);
        price.push(marketsList);
    }

    return response.json(price);
});

router.get('/prices', async function(request, response) {
    var MarketsList = [];
    var filter = request.query.exchangesFilter;

    if (!filter || filter.length === 0 || filter.includes(binance.name)) {
        var marketsList = await new Price().getPrices(binance.name);
        MarketsList.push(marketsList);
    }
    
    if (!filter || filter.length === 0 || filter.includes(coinbase.name)) {
        var marketsList = await new Price().getPrices(coinbase.name);
        MarketsList.push(marketsList);
    }

    return response.json(MarketsList);
});

module.exports = router;
