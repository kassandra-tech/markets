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
    [Route("markets")]
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
        public async Task<List<MarketNameModel>> Markets(Enums.Exchange exchange = 0)
        {
            switch (exchange)
            {
                case Enums.Exchange.Binance:
                    {
                        return await Startup.Binance.UpdateMarkets();
                    }
                case Enums.Exchange.Coinbase:
                    {
                        return await Startup.Coinbase.UpdateMarkets();
                    }
                case Enums.Exchange.KuCoin:
                    {
                        return await Startup.KuCoin.UpdateMarkets();
                    }
                case Enums.Exchange.HuobiGlobal:
                    {
                        return await Startup.HuobiGlobal.UpdateMarkets();
                    }
                case Enums.Exchange.FTX:
                    {
                        return await Startup.Ftx.UpdateMarkets();
                    }
                case Enums.Exchange.Kraken:
                    {
                        return await Startup.Kraken.UpdateMarkets();
                    }
                case Enums.Exchange.Bittrex:
                    {
                        return await Startup.Bittrex.UpdateMarkets();
                    }
                    default:
                    {
                        return new List<MarketNameModel>();
                    }
            }
        }

        /// <summary>
        /// Get market data for all markets on the exchange.
        /// NOTE: Only Binance, FTX, and Bittrex are returning market data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("data")]
        public async Task<List<MarketModel>> UpdateMarketData(Enums.Exchange exchange)
        {
            switch (exchange)
            {
                case Enums.Exchange.Binance:
                    {
                        return await Startup.Binance.UpdateMarketData();
                    }
                case Enums.Exchange.FTX:
                    {
                        return await Startup.Ftx.UpdateMarketData();
                    }
                case Enums.Exchange.Bittrex:
                    {
                        return await Startup.Bittrex.UpdateMarketData();
                    }
                default:
                    {
                        return new List<MarketModel>();
                    }
            }
        }

        /// <summary>
        /// Get market data for all markets on all exchanges.
        /// NOTE: Market data is from Binance, FTX, and Bittrex at this time.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("data/all")]
        public List<ExchangeModel> UpdateAllMarketData()
        {
            var exchangeData = new List<ExchangeModel>();

            var exchange = new ExchangeModel(Enums.Exchange.Binance, Startup.Binance.UpdateMarketData().Result);
            exchangeData.Add(exchange);

            exchange = new ExchangeModel(Enums.Exchange.FTX, Startup.Ftx.UpdateMarketData().Result);
            exchangeData.Add(exchange);

            exchange = new ExchangeModel(Enums.Exchange.Bittrex, Startup.Bittrex.UpdateMarketData().Result);
            exchangeData.Add(exchange);

            return exchangeData;
        }

        /// <summary>
        /// Get Exchanges associated with Markets.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("exchanges")]
        public ConcurrentDictionary<string, List<string>> MarketExchanges()
        {
            return ExchangeBase.MarketExchanges;
        }
    }
}
