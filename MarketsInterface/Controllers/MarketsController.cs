using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Exchanges;
using MarketsInterface.Kassandra;

using Microsoft.AspNetCore.Mvc;

namespace MarketsInterface.Controllers
{
    /// <summary>
    /// APIs to support Kassandra markets.
    /// </summary>
    [ApiController]
    [Route("market")]
    public class MarketController : ControllerBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public MarketController()
        {
        }

        /// <summary>
        /// Get available markets for the given exchange.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("markets")]
        public async Task<List<MarketModel>> Markets(ExchangeType exchange = 0)
        {
            switch (exchange)
            {
                case ExchangeType.Binance:
                    {
                        return await Binance.GetMarkets();
                    }
                case ExchangeType.Coinbase:
                    {
                        return await Coinbase.GetMarkets();
                    }
                case ExchangeType.KuCoin:
                    {
                        return await KuCoin.GetMarkets();
                    }
                case ExchangeType.HuobiGlobal:
                    {
                        return await HuobiGlobal.GetMarkets();
                    }
                case ExchangeType.FTX:
                    {
                        return await Ftx.GetMarkets();
                    }
                case ExchangeType.Kraken:
                    {
                        return await Kraken.GetMarkets();
                    }
                case ExchangeType.Bittrex:
                    {
                        return await Bittrex.GetMarkets();
                    }
                    default:
                    {
                        return new List<MarketModel>();
                    }
            }
        }

        /// <summary>
        /// Get market price for the given market on the selected exchange.
        /// NOTE: This is not returning price data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("price")]
        public async Task<List<PriceModel>> Price(ExchangeType exchange)
        {
            switch (exchange)
            {
                case ExchangeType.Binance:
                    {
                        return await Binance.GetPrices();
                    }
                case ExchangeType.FTX:
                    {
                        return await Ftx.GetPrices();
                    }
                case ExchangeType.Bittrex:
                    {
                        return await Bittrex.GetPrices();
                    }
                default:
                    {
                        return new List<PriceModel>();
                    }
            }
        }

        /// <summary>
        /// Get the market price range for the given timeframe.
        /// NOTE: This is not accurate price range data. Random values are generated based on the current price for testing purposes.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("price-range")]
        public async Task<List<PriceRangeModel>> PriceRange(ExchangeType exchange, DateTime startTime, DateTime endTime)
        {
            var priceRanges = new List<PriceRangeModel>();
            List<PriceModel> prices;

            switch (exchange)
            {
                case ExchangeType.Binance:
                    {
                        prices = await Binance.GetPrices();
                        break;
                    }
                case ExchangeType.FTX:
                    {
                        prices = await Ftx.GetPrices();
                        break;
                    }
                case ExchangeType.Bittrex:
                    {
                        prices = await Bittrex.GetPrices();
                        break;
                    }
                default:
                    {
                        return new List<PriceRangeModel>();
                    }
            }

            foreach (var price in prices)
            {
                var random = new Random();

                var model = new PriceRangeModel(exchange)
                {
                    Market = price.Market,
                    StartTime = startTime,
                    EndTime = endTime,
                    Price = price.Price,
                    LowPrice = random.NextDouble() * (price.Price - price.Price * 0.8) + price.Price * 0.8,
                    HighPrice = random.NextDouble() * (price.Price * 1.2 - price.Price) + price.Price
                };

                priceRanges.Add(model);
            }

            return priceRanges;
        }

        /// <summary>
        /// Get the volume for a given market.
        /// If an exchange is passed the volume for the given exchange will be returned.
        /// NOTE: This is not returning volume data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("volume")]
        public async Task<List<PriceVolumeModel>> Volume(ExchangeType exchange, DateTime startTime, DateTime endTime)
        {
            List<PriceModel> prices;
            var volumes = new List<PriceVolumeModel>();

            switch (exchange)
            {
                case ExchangeType.Binance:
                    {
                        prices = await Binance.GetPrices();
                        break;
                    }
                case ExchangeType.FTX:
                    {
                        prices = await Ftx.GetPrices();
                        break;
                    }
                case ExchangeType.Bittrex:
                    {
                        prices = await Bittrex.GetPrices();
                        break;
                    }
                default:
                    {
                        return new List<PriceVolumeModel>();
                    }
            }

            foreach (var price in prices)
            {
                var random = new Random();

                var model = new PriceVolumeModel(exchange)
                {
                    Market = price.Market,
                    StartTime = startTime,
                    EndTime = endTime,
                    Volume = random.NextDouble() * price.Price * 10000
                };

                volumes.Add(model);
            }

            return volumes;
        }

        /// <summary>
        /// Determine the current market price value compared to the given date range.
        /// NOTE: This is not returning price indicator data at this time.
        /// </summary>
        /// <param name="market">Market to retrieve data from.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("price-indicator")]
        public PriceIndicatorModel PriceIndicator(string market, DateTime startTime, DateTime endTime, ExchangeType exchange = 0)
        {
            return new PriceIndicatorModel(market, startTime, endTime, exchange);
        }

        /// <summary>
        /// Get the rank of the given market.
        /// NOTE: This is returning random rank data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="currency">Currency to get the rank of.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("rank")]
        public int Rank(ExchangeType exchange, string currency)
        {
            var random = new Random();

            return random.Next(1, 10000);
        }

        /// <summary>
        /// Get the rating of the given currency.
        /// NOTE: This is returning random rating data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="currency">Currency to get the rating of.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("rating")]
        public string Rating(ExchangeType exchange, string currency)
        {
            var random = new Random();
            var ratings = new List<string> { "A", "B", "C", "D", "E", "F" };

            return ratings[random.Next(ratings.Count)];
        }

        /// <summary>
        /// Get Exchanges associated with Markets.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("exchanges")]
        public ConcurrentDictionary<string, List<ExchangeType>> MarketExchanges()
        {
            return ExchangeBase.MarketExchanges;
        }

        private Binance Binance = new Binance();
        private Coinbase Coinbase = new Coinbase();
        private KuCoin KuCoin = new KuCoin();
        private HuobiGlobal HuobiGlobal = new HuobiGlobal();
        private Ftx Ftx = new Ftx();
        private Kraken Kraken = new Kraken();
        private Bittrex Bittrex = new Bittrex();
    }
}
