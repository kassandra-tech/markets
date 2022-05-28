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
            _ = UpdateMarkets();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.HuobiGlobal;

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
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            return await UpdateMarkets("sc", "bcdn", "qcdn", "data");
        }

        internal override string BaseAddress => "https://api.huobi.pro";
        internal override string MarketInformation => "v2/settings/common/symbols";
        internal override string CurrencyInformation => "v2/settings/common/currencies";
        internal override string PriceInformation => string.Empty;
    }
}
