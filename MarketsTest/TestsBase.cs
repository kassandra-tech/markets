using MarketsInterface;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace MarketsTest
{
    /// <summary>
    /// Common information, setup, and teardown for testing.
    /// </summary>
    public class TestsBase : IDisposable
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public TestsBase()
        {
            var host = new WebHostBuilder();
            host.UseStartup<Startup>();

            TestServer = new TestServer(host);
        }

        /// <summary>
        /// All
        /// </summary>
        public const string All = "All";

        /// <summary>
        /// BTC
        /// </summary>
        public const string Btc = "BTC";

        /// <summary>
        /// USD
        /// </summary>
        public const string Usd = "USD";

        /// <summary>
        /// USDT
        /// </summary>
        public const string Usdt = "USDT";

        /// <summary>
        /// ETH
        /// </summary>
        public const string Eth = "ETH";

        /// <summary>
        /// BNB
        /// </summary>
        public const string Bnb = "BNB";

        /// <summary>
        /// marketsFilter
        /// </summary>
        public const string MarketsFilter = "marketsFilter";

        /// <summary>
        /// exchangeFilter
        /// </summary>
        public const string ExchangesFilter = "exchangesFilter";

        /// <summary>
        /// favoriteMarkets
        /// </summary>
        public const string FavoriteMarkets = "favoriteMarkets";

        /// <summary>
        /// data
        /// </summary>
        public const string Data = "data";

        /// <summary>
        /// market
        /// </summary>
        public const string Market = "market";

        /// <summary>
        /// exchange
        /// </summary>
        public const string Exchange = "exchange";

        /// <summary>
        /// GET
        /// </summary>
        public const string GET = "GET";

        /// <summary>
        /// Not Valid
        /// </summary>
        public const string NotValid = "Not Valid";

        /// <summary>
        /// Dispose of the TestServer.
        /// </summary>
        public void Dispose()
        {
            TestServer.Dispose();
        }

        /// <summary>
        /// Server instance for testing.
        /// </summary>
        protected TestServer TestServer;
    }
}