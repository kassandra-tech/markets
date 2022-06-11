const express = require("express");
const router = express.Router();

const {Binance} = require('../exchanges/binance');

const binance = new Binance();

router.get('/currencies', async function(request, response) {
    var marketsList = await binance.markets();

    return response.json(marketsList);
});

router.get('/markets', async function(request, response) {
    var tempList = [];

    var filter = request.query.exchangesFilter;

    if (!filter || filter.length === 0 || filter.includes(binance.name)) {
        var marketsList = await binance.markets();
        tempList.push(marketsList);
    }

    return response.json(tempList);
});

module.exports = router;
