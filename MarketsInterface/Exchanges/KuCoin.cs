using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the KuCoin exchange.
    /// </summary>
    public class KuCoin : ExchangeBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public KuCoin()
        {
            UpdateCurrencies();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override ExchangeType Exchange => ExchangeType.KuCoin;

        /// <summary>
        /// Update currency information.
        /// </summary>
        public void UpdateCurrencies()
        {
            UpdateCurrencies("currency", "fullName", "data");
        }

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("baseCurrency", "quoteCurrency", "data");
        }

        internal override string BaseAddress => "https://api.kucoin.com";
        internal override string MarketInformation => "api/v1/symbols";
        internal override string CurrencyInformation => "/api/v1/currencies";
        internal override string PriceInformation => string.Empty;
    }
}
