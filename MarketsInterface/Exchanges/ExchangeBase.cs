using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using RestSharp;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Shared behavior between exchanges.
    /// </summary>
    public abstract class ExchangeBase
    {
        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public abstract ExchangeType Exchange { get; }

        /// <summary>
        /// Update currency information.
        /// </summary>
        /// <param name="symbol">Currency Symbol.</param>
        /// <param name="name">Full currency Name.</param>
        /// <param name="baseNode">Base node of info in the response structure.</param>
        public void UpdateCurrencies(string symbol, string name, string baseNode = "")
        {
            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(CurrencyInformation);

                var info = client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Result.Content) : JsonConvert.DeserializeObject<JObject>(info.Result.Content)[baseNode];

                foreach (var market in products)
                {
                    var currencySymbol = market[symbol].ToString();

                    if (!Currencies.ContainsKey(currencySymbol))
                    {
                        Currencies.TryAdd(currencySymbol, market[name].ToString());
                    }
                }
            }
        }

        /// <summary>
        /// Get market information.
        /// </summary>
        /// <param name="baseCurrencyString">Base currency in the market.</param>
        /// <param name="quoteCurrencyString">Quote currency in the market.</param>
        /// <param name="baseNode">Base node of info in the response structure.</param>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets(string baseCurrencyString, string quoteCurrencyString, string baseNode = "")
        {
            List<MarketModel> list = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Content) : JsonConvert.DeserializeObject<JObject>(info.Content)[baseNode];

                foreach (var market in products)
                {
                    var currency = market[baseCurrencyString].ToString();
                    var model = new MarketModel
                    {
                        Currency = currency,
                        QuoteCurrency = market[quoteCurrencyString].ToString(),
                        CurrencyName = Currencies.ContainsKey(currency) ? Currencies[currency] : string.Empty
                    };
                    list.Add(model);

                    if (!MarketExchanges.ContainsKey(model.Market))
                    {
                        var tempList = new List<ExchangeType>();
                        tempList.Add(Exchange);
                        MarketExchanges.TryAdd(model.Market, tempList);
                    }
                    else if (!MarketExchanges[model.Market].Contains(Exchange))
                    {
                        MarketExchanges[model.Market].Add(Exchange);
                    }
                }
            }

            return list;
        }

        internal abstract string BaseAddress { get; }
        internal abstract string CurrencyInformation { get; }
        internal abstract string MarketInformation { get; }

        internal static ConcurrentDictionary<string, string> Currencies = new ConcurrentDictionary<string, string>();
        internal static ConcurrentDictionary<string, List<ExchangeType>> MarketExchanges = new ConcurrentDictionary<string, List<ExchangeType>>();
    }
}
