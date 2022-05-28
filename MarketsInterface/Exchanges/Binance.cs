using System.Collections.Generic;
using System.Threading.Tasks;

using MarketsInterface.Kassandra;

namespace MarketsInterface.Exchanges
{
    /// <summary>
    /// Support for data from the Binance exchange.
    /// </summary>
    public class Binance : ExchangeBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        public Binance()
        {
            _ = UpdateMarkets();
        }

        /// <summary>
        /// Exchange name reference.
        /// </summary>
        public override Enums.Exchange Exchange => Enums.Exchange.Binance;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketNameModel>> UpdateMarkets()
        {
            return await UpdateMarketInformation("symbol", "baseAsset", "quoteAsset", "symbols");
        }

        /// <summary>
        /// Get current prices for supported markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> UpdateMarketData()
        {
            return await UpdateMarketData("symbol", "price");
        }

        internal override string BaseAddress => "https://api.binance.com/api/v3";
        internal override string MarketInformation => "exchangeInfo";
        internal override string CurrencyInformation => string.Empty;
        internal override string PriceInformation => "ticker/price";
    }
}
