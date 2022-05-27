using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Enums;
using MarketsInterface.Kassandra;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the Coinbase exchange.
    /// </summary>
    public class Coinbase : ExchangeBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public Coinbase()
        {
            UpdateCurrencies();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchanges Exchange => Enums.Exchanges.Coinbase;
        
        /// <summary>
        /// Update currency information.
        /// </summary>
        public void UpdateCurrencies()
        {
            UpdateCurrencies("id", "name");
        }

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("base_currency", "quote_currency");
        }

        internal override string BaseAddress => "https://api.exchange.coinbase.com";
        internal override string CurrencyInformation => "currencies";
        internal override string MarketInformation => "products";
        internal override string PriceInformation => string.Empty;
    }
}
