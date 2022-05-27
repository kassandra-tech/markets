using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Enums;
using MarketsInterface.Kassandra;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using RestSharp;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the Ftx exchange.
    /// </summary>
    public class Ftx : ExchangeBase
    {
        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchanges Exchange => Enums.Exchanges.FTX;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("baseCurrency", "quoteCurrency", "result");
        }

        /// <summary>
        /// Get current prices for supported markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<PriceModel>> GetPrices()
        {
            List<PriceModel> list = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = JsonConvert.DeserializeObject<JObject>(info.Content)["result"];

                foreach (var market in products)
                {
                    var model = new PriceModel
                    {
                        Exchange = Exchange,
                        Market = market["name"].ToString(),
                        Price = Convert.ToDouble(market["last"])
                    };
                    list.Add(model);
                }
            }

            return list;
        }

        internal override string BaseAddress => "https://ftx.us/api";
        internal override string MarketInformation => "markets";
        internal override string CurrencyInformation => string.Empty;
        internal override string PriceInformation => string.Empty;
    }
}
