﻿using System.Collections.Generic;
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
        /// Exchange name reference.
        /// </summary>
        public override ExchangeType Exchange => ExchangeType.Binance;

        /// <summary>
        /// Get available markets.
        /// </summary>
        /// <returns></returns>
        public async Task<List<MarketModel>> GetMarkets()
        {
            return await GetMarkets("baseAsset", "quoteAsset", "symbols");
        }

        internal override string BaseAddress => "https://api.binance.com/api/v3";
        internal override string MarketInformation => "exchangeInfo";
        internal override string CurrencyInformation => string.Empty;
    }
}
