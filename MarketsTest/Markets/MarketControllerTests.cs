using System.Net;

using Newtonsoft.Json.Linq;

namespace MarketsTest.Markets
{
    /// <summary>
    /// Tests to cover behavior for MarketController.
    /// </summary>
    public class MarketControllerTests : TestsBase
    {
        /// <summary>
        /// Verify something is returned when currencies is requested.
        /// </summary>
        [Fact]
        public async void GetCurrenciesTest()
        {
            var response = await TestServer.CreateRequest(CurrenciesRoute).SendAsync(GET).Result.Content.ReadAsStringAsync();

            Assert.NotEmpty(response.ToList());
        }

        /// <summary>
        /// Get supported markets given the provided exchangeFilter.
        /// </summary>
        /// <param name="exchangesFilter">Exchanges to request markets from.</param>
        /// <param name="expectedExchangeCount">Expected exchanges to return data.</param>
        [Theory]
        [InlineData("", 7)] // All Exchanges implied
        [InlineData("Binance", 1)] // Named exchange
        [InlineData("Binance,Coinbase,KuCoin,NotValid", 3)] // Multiple exchanges with invalid exchange
        [InlineData("Binance,Coinbase,KuCoin,HuobiGlobal,FTX,Kraken,Bittrex", 7)] // All supported named exchanges
        [InlineData(NotValid, 0)] // Invalid Exchange
        public async void GetMarketsTest(string exchangesFilter, int expectedExchangeCount)
        {
            var count = 0;
            var route = !string.IsNullOrWhiteSpace(exchangesFilter) ? $"{MarketsRoute}?{ExchangesFilter}={exchangesFilter}" : MarketsRoute;

            var response = await TestServer.CreateRequest(route).SendAsync(GET).Result.Content.ReadAsStringAsync();

            if (!string.IsNullOrWhiteSpace(response))
            {
                var content = JArray.Parse(response);

                foreach (var item in content)
                {
                    if (!string.IsNullOrEmpty(item[Exchange]?.ToString()))
                    {
                        count++;
                    }
                }
            }

            Assert.Equal(expectedExchangeCount, count);
        }

        /// <summary>
        /// Get market data filtered by the marketFilter.
        /// </summary>
        /// <param name="marketsFilter">Markets to request data from.</param>
        /// <param name="exchangesFilter">Exchanges to request markets from.</param>
        /// <param name="expectedExchangeCount">Expected exchanges to return data.</param>
        [Theory]
        [InlineData(All, "", 3)] // All Markets
        [InlineData(Btc, "", 3)] // Single Market
        [InlineData(Usd, "", 2)] // Single Market
        [InlineData(Usdt, "", 3)] // Single Market
        [InlineData(Eth, "", 2)] // Single Market
        [InlineData(Bnb, "FTX,Bittrex", 0)] // Multiple Exchanges, not supported Currency
        public async void MarketDataByMarketTypeTest(string marketsFilter, string exchangesFilter, int expectedExchangeCount)
        {
            var count = 0;
            var exchangePath = !string.IsNullOrWhiteSpace(exchangesFilter) ? $"&{ExchangesFilter}={exchangesFilter}" : string.Empty;
            var route = $"{DataRoute}?{MarketsFilter}={marketsFilter}{exchangePath}";

            var response = await TestServer.CreateRequest(route).SendAsync(GET).Result.Content.ReadAsStringAsync();

            if (!string.IsNullOrWhiteSpace(response))
            {
                var content = JArray.Parse(response);

                foreach (var item in content)
                {
                    var dataValues = item[Data];
                    if (dataValues != null)
                    {
                        foreach (var market in dataValues)
                        {
                            var marketValue = market[Market]?.ToString();
                            if (marketValue != null && !marketValue.Contains(marketsFilter) && marketsFilter != All)
                            {
                                Assert.Equal(marketsFilter, marketValue);
                            }
                        }

                        if (dataValues.ToList().Count > 0)
                        {
                            count++;
                        }
                    }
                }
            }

            Assert.Equal(expectedExchangeCount, count);
        }

        /// <summary>
        /// Invalid market filters should not return any data.
        /// </summary>
        /// <param name="marketsFilter">Markets to request data from.</param>
        /// <param name="exchangesFilter">Exchanges to request markets from.</param>
        [Theory]
        [InlineData("-1", "")] // Invalid Market type
        [InlineData(NotValid, "")] // Invalid Market type
        public async void MarketDataInvalidMarketFilterTest(string marketsFilter, string exchangesFilter)
        {
            var exchangePath = !string.IsNullOrWhiteSpace(exchangesFilter) ? $"&{ExchangesFilter}={exchangesFilter}" : string.Empty;
            var route = $"{DataRoute}?{MarketsFilter}={marketsFilter}{exchangePath}";

            var response = await TestServer.CreateRequest(route).SendAsync(GET);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        /// <summary>
        /// Get market data for favoriteMarkets.
        /// </summary>
        /// <param name="favoriteMarkets">Favorite market list to return data for.</param>
        /// <param name="expectedExchangeCount">Expected exchanges to return data.</param>
        [Theory]
        [InlineData("BNB-BTC", 1)] // Single Market
        [InlineData("BTC-USD", 2)] // Single Market
        [InlineData("ETH-BTC,UNI-ETH", 3)] // Multiple Markets
        [InlineData(NotValid, 0)] // Invalid Market
        [InlineData("", 0)] // Invalid Market
        public async void FavoriteMarketsTest(string favoriteMarkets, int expectedExchangeCount)
        {
            var count = 0;
            var path = !string.IsNullOrWhiteSpace(favoriteMarkets) ? $"{FavoritesRoute}?{FavoriteMarkets}={favoriteMarkets}" : FavoritesRoute;
            var response = await TestServer.CreateRequest(path).SendAsync(GET).Result.Content.ReadAsStringAsync();

            if (!string.IsNullOrWhiteSpace(response))
            {
                var content = JArray.Parse(response);

                foreach (var item in content)
                {
                    if (item != null && item[Data].HasValues)
                    {
                        if (!string.IsNullOrWhiteSpace((item[Data] ?? string.Empty).First()[Market]?.ToString()))
                        {
                            count++;
                        }
                    }
                }
            }

            Assert.Equal(expectedExchangeCount, count);
        }

        /// <summary>
        /// markets
        /// </summary>
        public const string MarketsRoute = "markets";

        /// <summary>
        /// markets/currencies
        /// </summary>
        public const string CurrenciesRoute = $"{MarketsRoute}/currencies";

        /// <summary>
        /// markets/data
        /// </summary>
        public const string DataRoute = $"{MarketsRoute}/data";

        /// <summary>
        /// markets/favorites
        /// </summary>
        public const string FavoritesRoute = $"{MarketsRoute}/favorites";
    }
}