﻿using System;
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
        /// Constructor.
        /// </summary>
        public ExchangeBase()
        {
            Markets = new List<MarketNameModel>();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public abstract Enums.Exchange Exchange { get; }

        /// <summary>
        /// BTC
        /// </summary>
        public const string BtcSymbol = "BTC";

        /// <summary>
        /// USD
        /// </summary>
        public const string UsdSymbol = "USD";

        /// <summary>
        /// USDT
        /// </summary>
        public const string UsdtSymbol = "USDT";

        /// <summary>
        /// ETH
        /// </summary>
        public const string EthSymbol = "ETH";

        /// <summary>
        /// BNB
        /// </summary>
        public const string BnbSymbol = "BNB";

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
        /// <param name="marketString">Market attribute name in the response.</param>
        /// <param name="baseCurrencyString">Base currency attribute in the response.</param>
        /// <param name="quoteCurrencyString">Quote currency attribute in the response.</param>
        /// <param name="baseNode">Base node of info in the response.</param>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarketInformation(string marketString, string baseCurrencyString, string quoteCurrencyString, string baseNode = "")
        {
            Markets = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(MarketInformation);

                var info = await client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Content) : JsonConvert.DeserializeObject<JObject>(info.Content)[baseNode];

                foreach (var market in products)
                {
                    var currency = market[baseCurrencyString].ToString();
                    var model = new MarketNameModel(market[marketString].ToString(), currency, market[quoteCurrencyString].ToString(), Currencies.ContainsKey(currency) ? Currencies[currency] : string.Empty);
                    Markets.Add(model);

                    if (!MarketExchanges.ContainsKey(model.Market))
                    {
                        var tempList = new List<string>();
                        tempList.Add(Exchange.ToString());
                        MarketExchanges.TryAdd(model.Market, tempList);
                    }
                    else if (!MarketExchanges[model.Market].Contains(Exchange.ToString()))
                    {
                        MarketExchanges[model.Market].Add(Exchange.ToString());
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
        public async Task<List<MarketModel>> UpdateMarketData(string marketString, string priceString, string baseNode = "")
        {
            MarketData = new();

            using (var client = new RestClient(BaseAddress))
            {
                var request = new RestRequest(PriceInformation);

                var info = await client.GetAsync(request);
                var products = string.IsNullOrEmpty(baseNode) ? JsonConvert.DeserializeObject<JArray>(info.Content) : JsonConvert.DeserializeObject<JObject>(info.Content)[baseNode];

                foreach (var market in products)
                {
                    var model = Markets.Find(x => x.Name == market[marketString].ToString());
                    MarketData.Add(new MarketModel(model, Convert.ToDouble(market[priceString]), exchanges: MarketExchanges[model.Market]));
                }
            }

            return MarketData;
        }

        
        internal List<MarketModel> FilterMarketData(List<MarketModel> data, Enums.MarketFilters marketFilter)
        {
            _ = Enum.TryParse(marketFilter.ToString(), out Enums.MarketFilters activeFilter);

            // The All case returns the raw data.
            // The Favorites case is handled by FavoriteMarketData.
            if (activeFilter == Enums.MarketFilters.BTC)
            {
                data = data.FindAll(x => x.QuoteCurrency == BtcSymbol);
            }
            else if (activeFilter == Enums.MarketFilters.USD)
            {
                data = data.FindAll(x => x.QuoteCurrency == UsdSymbol);
            }
            else if (activeFilter == Enums.MarketFilters.USDT)
            {
                data = data.FindAll(x => x.QuoteCurrency == UsdtSymbol);
            }
            else if (activeFilter == Enums.MarketFilters.ETH)
            {
                data = data.FindAll(x => x.QuoteCurrency == EthSymbol);
            }
            else if (activeFilter == Enums.MarketFilters.BNB)
            {
                data = data.FindAll(x => x.QuoteCurrency == BnbSymbol);
            }

            return data;
        }

        
        internal List<MarketModel> FavoriteMarketData(List<MarketModel> data, List<string> favoriteMarkets)
        {
            return data.FindAll(x => favoriteMarkets.Contains(x.Market));
        }

        internal static List<Enums.Exchange> GetActiveExchanges(List<Enums.Exchange> exchangeFilter)
        {
            List<Enums.Exchange> exchanges = new List<Enums.Exchange>();
            foreach (var item in exchangeFilter)
            {
                exchanges.Add(item);
            }

            return exchanges;
        }

        internal static bool IsExchangeActive(Enums.Exchange exchange, List<Enums.Exchange> exchangeFilter) => exchangeFilter.Contains(exchange) || exchangeFilter.Count == 0;

        internal abstract string BaseAddress { get; }
        internal abstract string CurrencyInformation { get; }
        internal abstract string MarketInformation { get; }
        internal abstract string PriceInformation { get; }

        internal static ConcurrentDictionary<string, string> Currencies = new();
        internal static ConcurrentDictionary<string, List<string>> MarketExchanges = new();

        internal List<MarketModel> MarketData { get; set; }
        internal List<MarketNameModel> Markets { get; set; }
    }
}
