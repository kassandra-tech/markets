using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        /// Constructor.
        /// </summary>
        public Ftx()
        {
            _ = UpdateMarkets();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.FTX;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            return await UpdateMarkets("name", "baseCurrency", "quoteCurrency", "result");
        }

        /// <summary>
        /// Get current prices for supported markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetPrices()
        {
            Prices = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = JsonConvert.DeserializeObject<JObject>(info.Content)["result"];

                foreach (var market in products)
                {
                    Prices.Add(new MarketModel(Markets.Find(x => x.Name == market["name"].ToString()), Convert.ToDouble(market["last"])));
                }
            }

            return Prices;
        }

        internal override string BaseAddress => "https://ftx.us/api";
        internal override string MarketInformation => "markets";
        internal override string CurrencyInformation => string.Empty;
        internal override string PriceInformation => string.Empty;
    }
}
