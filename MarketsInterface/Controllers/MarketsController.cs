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
        /// Available markets for the given exchange based on the current exchange filter.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<List<KeyValuePair<string, List<MarketNameModel>>>> Markets()
        {
            var list = new List<KeyValuePair<string, List<MarketNameModel>>>();
            KeyValuePair<string, List<MarketNameModel>> item;

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Binance))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.Binance.ToString(), await Startup.Binance.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Coinbase))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.Coinbase.ToString(), await Startup.Coinbase.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.KuCoin))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.KuCoin.ToString(), await Startup.KuCoin.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.HuobiGlobal))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.HuobiGlobal.ToString(), await Startup.HuobiGlobal.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.FTX))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.FTX.ToString(), await Startup.Ftx.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Kraken))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.Kraken.ToString(), await Startup.Kraken.UpdateMarkets());

                list.Add(item);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Bittrex))
            {
                item = new KeyValuePair<string, List<MarketNameModel>>(Enums.Exchange.Bittrex.ToString(), await Startup.Bittrex.UpdateMarkets());

                list.Add(item);
            }

            return list;
        }

        /// <summary>
        /// Market data based on the current market and exchange filter settings.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("data")]
        public List<ExchangeModel> MarketData()
        {
            var exchangeData = new List<ExchangeModel>();
            List<MarketModel> data;
            ExchangeModel exchange;

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Binance))
            {
                data = Startup.Binance.FilterMarketData(Startup.Binance.UpdateMarketData().Result);
                exchange = new ExchangeModel(Enums.Exchange.Binance, data);
                exchangeData.Add(exchange);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.FTX))
            {
                data = Startup.Ftx.FilterMarketData(Startup.Ftx.UpdateMarketData().Result);
                exchange = new ExchangeModel(Enums.Exchange.FTX, data);
                exchangeData.Add(exchange);
            }

            if (ExchangeBase.IsExchangeActive(Enums.Exchange.Bittrex))
            {
                data = Startup.Bittrex.FilterMarketData(Startup.Bittrex.UpdateMarketData().Result);
                exchange = new ExchangeModel(Enums.Exchange.Bittrex, data);
                exchangeData.Add(exchange);
            }

            return exchangeData;
        }

        /// <summary>
        /// Update Markets in view.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("update/market-filter")]
        public Enums.MarketFilters UpdateFilteredMarketData(Enums.MarketFilters marketFilter)
        {
            ExchangeBase.ActiveMarketFilter = marketFilter;

            return ExchangeBase.ActiveMarketFilter;
        }

        /// <summary>
        /// Update Exchanges in view.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("update/exchange-filter")]
        public List<Enums.Exchange> UpdateFilteredExchanges(List<Enums.Exchange> exchanges)
        {
            ExchangeBase.ActiveExchanges = exchanges;

            return ExchangeBase.ActiveExchanges;
        }

        /// <summary>
        /// Clear Market and Exchange filters.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("update/clear-filters")]
        public void ClearFilters()
        {
            ExchangeBase.ActiveExchanges = new();
            ExchangeBase.ActiveMarketFilter = new();
        }
    }
}
