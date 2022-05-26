using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the HuobiGlobal exchange.
    /// </summary>
    public class HuobiGlobal : ExchangeBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public HuobiGlobal()
        {
            UpdateCurrencies();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override ExchangeType Exchange => ExchangeType.HuobiGlobal;

        /// <summary>
        /// Update currency information.
        /// </summary>
        public void UpdateCurrencies()
        {
            UpdateCurrencies("cc", "fn", "data");
        }

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("bc", "qc", "data");
        }

        internal override string BaseAddress => "https://api.huobi.pro";
        internal override string MarketInformation => "v2/settings/common/symbols";
        internal override string CurrencyInformation => "v2/settings/common/currencies";
        internal override string PriceInformation => string.Empty;
    }
}
