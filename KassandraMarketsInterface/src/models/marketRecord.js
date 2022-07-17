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

            var price = parseFloat(marketInformation.price, 8);
            var lowPrice = parseFloat(marketInformation.lowPrice, 8);
            var highPrice = parseFloat(marketInformation.highPrice, 8);
            var avgPrice = parseFloat((highPrice + lowPrice) / 2, 8);
            var priceGap = parseFloat((highPrice - lowPrice) / 5, 8);
            var lowPercentage = parseFloat(((price / lowPrice) -1) * 100, 8);
            var highPercentage = parseFloat((price / highPrice) * 100, 8);

            if (lowPrice === highPrice) {
                this.priceLabel = "Hold";
                this.pricePercentage = 0.0;
            }
            else if (price <= parseFloat(lowPrice + priceGap, 8)) {
                this.priceLabel = "Strong Buy";
                this.pricePercentage = lowPercentage;
            } else if (price <= parseFloat(lowPrice + (priceGap * 2), 8)) {
                this.priceLabel = "Buy";
                this.pricePercentage = lowPercentage;
            } else if (price <= parseFloat(lowPrice + (priceGap * 3), 8)) {
                this.priceLabel = "Hold";
                if (price < avgPrice) {
                    this.pricePercentage = lowPercentage;
                } else {
                    this.pricePercentage = highPercentage;
                }
            } else if (price <= parseFloat(lowPrice + (priceGap * 4), 8)) {
                this.priceLabel = "Sell";
                this.pricePercentage = highPercentage;
            } else {
                this.priceLabel = "Strong Sell";
                this.pricePercentage = highPercentage;
            }

            this.buyVolume = parseFloat(marketInformation.buyVolume, 8) + parseFloat(this.buyVolume, 8);
            this.sellVolume = parseFloat(marketInformation.sellVolume, 8) + parseFloat(this.sellVolume, 8);
            this.volume = parseFloat(marketInformation.volume, 8) + parseFloat(this.volume, 8);
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

            let currencyObj = Moralis.Object.extend(Definitions.CurrenciesString);
            var query = new Moralis.Query(currencyObj);
            query.descending(Definitions.createdAtString);
            var currencies = await query.first();

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

                var curr = currencies.get(Definitions.currenciesString);
                var currency = curr.filter(currency => currency.symbol === marketRecord.currency)[0];
                marketRecord.currencyName = currency.name;
                marketRecord.rank = currency.rank;

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
