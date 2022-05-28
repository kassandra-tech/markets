using System.Collections.Generic;
using System.Threading.Tasks;

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
            _ = UpdateMarkets();
            UpdateCurrencies();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.Coinbase;
        
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
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            return await UpdateMarketInformation("id", "base_currency", "quote_currency");
        }

        internal override string BaseAddress => "https://api.exchange.coinbase.com";
        internal override string CurrencyInformation => "currencies";
        internal override string MarketInformation => "products";
        internal override string PriceInformation => string.Empty;
    }
}
