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
        this.buyVolume = 0.0;
        this.sellVolume = 0.0;
        this.volume = 0.0;
        this.exchanges = [];
    }

    update(marketInformation) {
        if (marketInformation.lowPrice < this.lowPrice) {
            this.lowPrice = marketInformation.lowPrice;
        }

        if (marketInformation.highPrice > this.highPrice) {
            this.highPrice = marketInformation.highPrice;
        }

        this.buyVolume = parseFloat(marketInformation.buyVolume) + parseFloat(this.buyVolume);
        this.sellVolume = parseFloat(marketInformation.sellVolume) + parseFloat(this.sellVolume);
        this.volume = parseFloat(marketInformation.volume) + parseFloat(this.volume);
    }

    async getRecords(minutes) {
        try {
            var list = [];
            let MarketsObj = Moralis.Object.extend(Definitions.MarketsString);
            let query = new Moralis.Query(MarketsObj);
            query.descending(Definitions.createdAtString);
            var record = await query.first();
            var currencyInfo = record.get(Definitions.marketsString);

            let PricesObj = Moralis.Object.extend(Definitions.PricesString);
            query = new Moralis.Query(PricesObj);
            query.descending(Definitions.createdAtString);
            query.greaterThan(Definitions.updatedAtString, new Date(Date.now() - (minutes * 60000)));
            var priceInfo = await query.find();

            currencyInfo.forEach(record => {
                var found = list.find(market => market.symbol === record.symbol);

                if (found === undefined) {
                var marketRecord = new MarketRecord();
                marketRecord.symbol = record.name;
                marketRecord.currency = marketRecord.symbol.split("-")[0];
                marketRecord.quoteCurrency = marketRecord.symbol.split("-")[1];
                marketRecord.exchanges = record.exchanges;
                list.push(marketRecord);
                }
            })

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
            var MarketObj = Moralis.Object.extend("MarketRecord");
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
