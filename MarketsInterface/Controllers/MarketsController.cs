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
        /// Available currencies.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("currencies")]
        public ICollection<string> Currencies()
        {
            return ExchangeBase.Currencies.Keys;
        }

        /// <summary>
        /// Available markets. 
        /// </summary>
        /// <param name="exchangesFilter">Exchanges to get data from. Available options are Binance,Coinbase,KuCoin,HuobiGlobal,FXT,Kraken,Bittrex, ex: Binance,Coinbase</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<ExchangeMarketsModel>> Markets(string exchangesFilter)
        {
            var list = new List<ExchangeMarketsModel>();
            ExchangeMarketsModel item;
            var exchanges = ExchangeBase.GetActiveExchanges(exchangesFilter);

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Binance, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.Binance, await Startup.Binance.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Coinbase, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.Coinbase, await Startup.Coinbase.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.KuCoin, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.KuCoin, await Startup.KuCoin.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.HuobiGlobal, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.HuobiGlobal, await Startup.HuobiGlobal.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.FTX, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.FTX, await Startup.Ftx.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Kraken, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.Kraken, await Startup.Kraken.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Bittrex, exchanges))
            {
                item = new ExchangeMarketsModel(Enums.Exchange.Bittrex, await Startup.Bittrex.UpdateMarkets());

                list.Add(item);
            }

            return list;
        }

        /// <summary>
        /// Market data based on the provided market and exchange filter.
        /// </summary>
        /// <param name="marketsFilter">Markets to return data for.</param>
        /// <param name="exchangesFilter">Exchanges to get data from. Available options are Binance,Coinbase,KuCoin,HuobiGlobal,FXT,Kraken,Bittrex, ex: Binance,Coinbase</param>
        /// <returns></returns>
        [HttpGet]
        [Route("data")]
        public List<ExchangeModel> MarketData(Enums.MarketFilters marketsFilter, string exchangesFilter = "")
        {
            var exchangeData = new List<ExchangeModel>();
            List<MarketModel> data;
            ExchangeModel exchange;

            var exchanges = ExchangeBase.GetActiveExchanges(exchangesFilter);

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Binance, exchanges))
            {
                data = Startup.Binance.FilterMarketData(Startup.Binance.UpdateMarketData().Result, marketsFilter);
                exchange = new ExchangeModel(Enums.Exchange.Binance, data);
                exchangeData.Add(exchange);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.FTX, exchanges))
            {
                data = Startup.Ftx.FilterMarketData(Startup.Ftx.UpdateMarketData().Result, marketsFilter);
                exchange = new ExchangeModel(Enums.Exchange.FTX, data);
                exchangeData.Add(exchange);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Bittrex, exchanges))
            {
                data = Startup.Bittrex.FilterMarketData(Startup.Bittrex.UpdateMarketData().Result, marketsFilter);
                exchange = new ExchangeModel(Enums.Exchange.Bittrex, data);
                exchangeData.Add(exchange);
            }

            return exchangeData;
        }

        /// <summary>
        /// Market data for all favorite markets.
        /// </summary>
        /// <param name="favoriteMarkets">List of favorite markets. ex: BTC-USD,ETH-BTC</param>
        /// <returns></returns>
        [HttpGet]
        [Route("favorites")]
        public List<ExchangeModel> FavoriteMarkets(string favoriteMarkets)
        {
            var exchangeData = new List<ExchangeModel>();
            List<MarketModel> data;
            ExchangeModel exchange;

            var favoritesList = !string.IsNullOrWhiteSpace(favoriteMarkets) ? new List<string>(favoriteMarkets.Split(',')) : new List<string>();

            data = Startup.Binance.FavoriteMarketData(Startup.Binance.UpdateMarketData().Result, favoritesList);
            exchange = new ExchangeModel(Enums.Exchange.Binance, data);
            exchangeData.Add(exchange);

            data = Startup.Ftx.FavoriteMarketData(Startup.Ftx.UpdateMarketData().Result, favoritesList);
            exchange = new ExchangeModel(Enums.Exchange.FTX, data);
            exchangeData.Add(exchange);

            data = Startup.Bittrex.FavoriteMarketData(Startup.Bittrex.UpdateMarketData().Result, favoritesList);
            exchange = new ExchangeModel(Enums.Exchange.Bittrex, data);
            exchangeData.Add(exchange);

            return exchangeData;
        }
    }
}
