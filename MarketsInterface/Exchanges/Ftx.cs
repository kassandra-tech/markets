using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

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
        public override ExchangeType Exchange => ExchangeType.FTX;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("baseCurrency", "quoteCurrency", "result");
        }

        internal override string BaseAddress => "https://ftx.us/api";
        internal override string MarketInformation => "markets";
        internal override string CurrencyInformation => string.Empty;
    }
}
