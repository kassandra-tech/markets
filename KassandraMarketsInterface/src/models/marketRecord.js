const Moralis = require("moralis/node");
const { RecordDefinitions } = require("./recordDefinitions");

const Definitions = new RecordDefinitions();

class MarketRecord {
    constructor() {
        this.symbol = "";
        this.currency = "";
        this.quoteCurrency = "";
        this.currencyName = "";
        this.rank = 0;
        this.rating = "";
        this.price = 0.0;
        this.lowPrice = 0.0;
        this.highPrice = 0.0;
        this.pricePercentage = 0.0;
        this.priceLabel = "";
        this.buyVolume = 0.0;
        this.sellVolume = 0.0;
        this.volume = 0.0;
        this.exchanges = [];
    }

    update(marketInformation) {
        try {
            if (marketInformation.lowPrice < this.lowPrice || this.lowPrice === 0.0) {
                this.lowPrice = marketInformation.lowPrice;
            }

            if (marketInformation.highPrice > this.highPrice) {
                this.highPrice = marketInformation.highPrice;
            }

            var price = parseFloat(marketInformation.price);
            var lowPrice = parseFloat(marketInformation.lowPrice);
            var highPrice = parseFloat(marketInformation.highPrice);
            var priceDifference = highPrice - lowPrice;
            var avgPrice = priceDifference + lowPrice;
            var lowPercentage = 1 - (price / avgPrice) * 100;
            var highPercentage = 1 - (price / avgPrice) * 100;

            if (price <= lowPrice + (priceDifference * 0.2)) {
                this.priceLabel = "Strong Buy";
                this.pricePercentage = lowPercentage;
            } else if (price <= lowPrice + priceDifference * 0.4) {
                this.priceLabel = "Buy";
                this.pricePercentage = lowPercentage;
            } else if (price <= lowPrice + priceDifference * 0.6 || priceDifference === 0) {
                this.priceLabel = "Hold";
                if (price < avgPrice) {
                    this.pricePercentage = lowPercentage;
                } else if (price > avgPrice) {
                    this.pricePercentage = highPercentage;
                } else {
                    this.pricePercentage = 0.0;
                }
            } else if (price <= lowPrice + priceDifference * 0.8) {
                this.priceLabel = "Sell";
                this.pricePercentage = highPercentage;
            } else {
                this.priceLabel = "Strong Sell";
                this.pricePercentage = highPercentage;
            }

            this.buyVolume = parseFloat(marketInformation.buyVolume) + parseFloat(this.buyVolume);
            this.sellVolume = parseFloat(marketInformation.sellVolume) + parseFloat(this.sellVolume);
            this.volume = parseFloat(marketInformation.volume) + parseFloat(this.volume);
        } catch (error) {
            console.log(error);
        }
    }

    async getRecords(currencyInfo, prices, minutes) {
        try {
            var list = [];

            // Get price records for the last x minutes.
            let PricesObj = Moralis.Object.extend(Definitions.PricesString);
            var query = new Moralis.Query(PricesObj);
            query.descending(Definitions.createdAtString);
            query.greaterThan(Definitions.updatedAtString, new Date(Date.now() - (minutes * 60000)));
            var priceInfo = await query.find();

            currencyInfo.forEach(record => {
                var marketInfo = list.find(market => market.symbol === record.market);
                var price = prices[record.market];
                var marketRecord = new MarketRecord();

                // Update market, currency, and exchanges information.
                if (marketInfo === undefined) {
                    marketRecord.symbol = record.market;
                    marketRecord.currency = marketRecord.symbol.split("-")[0];
                    marketRecord.quoteCurrency = marketRecord.symbol.split("-")[1];
                    marketRecord.exchanges = record.exchanges;
                // Set current price and price high and low information.
                if (price !== undefined) {
                    marketRecord.price = price.price;
                    marketRecord.lowPrice = price.price;
                    marketRecord.highPrice = price.price;
                }
                list.push(marketRecord);
                }
            })

            // Update price and volume information.
            priceInfo.forEach(priceRecord => {
                var marketInformation = priceRecord.get(Definitions.pricesString);
                marketInformation.forEach(stuff => {
                    var finds = list.find(market => market.symbol === stuff.symbol);
                    finds.update(stuff);
                })
            })

            this.saveMarketsRecord(list);
        } catch (error) {
            console.log(error);
        }
    }

    async saveMarketsRecord(record) {
        try {
            var MarketObj = Moralis.Object.extend(Definitions.marketRecordString);
            var marketObj = new MarketObj();
            marketObj.set(Definitions.marketsString, record);

            await marketObj.save();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    MarketRecord
};
