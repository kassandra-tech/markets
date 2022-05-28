using System;
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

        public ExchangeBase()
        {
            Markets = new List<MarketNameModel>();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public abstract Enums.Exchange Exchange { get; }

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
        /// <param name="market"></param>
        /// <param name="baseCurrencyString">Base currency in the market.</param>
        /// <param name="quoteCurrencyString">Quote currency in the market.</param>
        /// <param name="baseNode">Base node of info in the response structure.</param>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarkets(string market, string baseCurrencyString, string quoteCurrencyString, string baseNode = "")
        {
            Markets = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Content) : JsonConvert.DeserializeObject<JObject>(info.Content)[baseNode];

                foreach (var marketString in products)
                {
                    var currency = marketString[baseCurrencyString].ToString();
                    var model = new MarketNameModel(marketString[market].ToString(), currency, marketString[quoteCurrencyString].ToString(), Currencies.ContainsKey(currency) ? Currencies[currency] : string.Empty);
                    Markets.Add(model);

                    if (!MarketExchanges.ContainsKey(model.Market))
                    {
                        var tempList = new List<Enums.Exchange>();
                        tempList.Add(Exchange);
                        MarketExchanges.TryAdd(model.Market, tempList);
                    }
                    else if (!MarketExchanges[model.Market].Contains(Exchange))
                    {
                        MarketExchanges[model.Market].Add(Exchange);
                    }
                }
            }

            return Markets;
        }

        /// <summary>
        /// Get price information.
        /// </summary>
        /// <param name="marketString">Market string reference.</param>
        /// <param name="priceString">Price string reference.</param>
        /// <param name="baseNode">Base node of info in the response structure.</param>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetPrices(string marketString, string priceString, string baseNode = "")
        {
            Prices = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(PriceInformation);

                var info = await client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Content) : JsonConvert.DeserializeObject<JObject>(info.Content)[baseNode];

                foreach (var market in products)
                {
                    Prices.Add(new MarketModel(Markets.Find(x => x.Name == market[marketString].ToString()), Convert.ToDouble(market[priceString])));
                }
            }

            return Prices;
        }

        internal abstract string BaseAddress { get; }
        internal abstract string CurrencyInformation { get; }
        internal abstract string MarketInformation { get; }
        internal abstract string PriceInformation { get; }

        internal static ConcurrentDictionary<string, string> Currencies = new();
        internal static ConcurrentDictionary<string, List<Enums.Exchange>> MarketExchanges = new();
        
        internal List<MarketModel> Prices { get; set; }
        internal List<MarketNameModel> Markets { get; set; }
    }
}
