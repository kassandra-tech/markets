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
        /// Constructor.
        /// </summary>
        public Bittrex()
        {
            _ = UpdateMarkets();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.Bittrex;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            return await UpdateMarkets("symbol", "baseCurrencySymbol", "quoteCurrencySymbol");
        }

        /// <summary>
        /// Get current prices for supported markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetPrices()
        {
            return await GetPrices("symbol", "lastTradeRate");
        }

        internal override string BaseAddress => "https://api.bittrex.com/v3";
        internal override string MarketInformation => "markets";
        internal override string CurrencyInformation => string.Empty;
        internal override string PriceInformation => "markets/tickers";
    }
}
