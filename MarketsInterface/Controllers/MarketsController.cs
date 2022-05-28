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
        /// Get market price for the given market on the selected exchange.
        /// NOTE: This is not returning price data at this time.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("price")]
        public async Task<List<MarketModel>> Price(Enums.Exchange exchange)
        {
            switch (exchange)
            {
                case Enums.Exchange.Binance:
                    {
                        return await Startup.Binance.GetPrices();
                    }
                case Enums.Exchange.FTX:
                    {
                        return await Startup.Ftx.GetPrices();
                    }
                case Enums.Exchange.Bittrex:
                    {
                        return await Startup.Bittrex.GetPrices();
                    }
                default:
                    {
                        return new List<MarketModel>();
                    }
            }
        }

        /// <summary>
        /// Get Exchanges associated with Markets.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("exchanges")]
        public ConcurrentDictionary<string, List<Enums.Exchange>> MarketExchanges()
        {
            return ExchangeBase.MarketExchanges;
        }
    }
}
