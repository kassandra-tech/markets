using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using RestSharp;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the Kraken exchange.
    /// </summary>
    public class Kraken : ExchangeBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public Kraken()
        {
            _ = UpdateMarkets();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.Kraken;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            List<MarketNameModel> list = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = JsonConvert.DeserializeObject<JObject>(info.Content)["result"];

                foreach (var market in products)
                {
                    var currency = market.Values<string>("base").FirstOrDefault();
                    var model = new MarketNameModel(market.Values<string>("altname").FirstOrDefault(),
                                                currency,
                                                market.Values<string>("quote").FirstOrDefault(),
                                                Currencies.ContainsKey(currency) ? Currencies[currency] : string.Empty);
                    list.Add(model);
                }
            }

            return list;
        }

        internal override string BaseAddress => "https://api.kraken.com/0/public";
        internal override string MarketInformation => "AssetPairs";
        internal override string CurrencyInformation => string.Empty;
        internal override string PriceInformation => string.Empty;
    }
}
