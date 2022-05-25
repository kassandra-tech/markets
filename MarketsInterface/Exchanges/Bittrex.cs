using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the Bittrex exchange.
    /// </summary>
    public class Bittrex : ExchangeBase
    {
        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override ExchangeType Exchange => ExchangeType.Bittrex;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("baseCurrencySymbol", "quoteCurrencySymbol");
        }

        internal override string BaseAddress => "https://api.bittrex.com/v3";
        internal override string MarketInformation => "markets";
        internal override string CurrencyInformation => "";
    }
}
