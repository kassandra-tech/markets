using System;
using System.Collections.Generic;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Data for viewing exchange information by member selection.
    /// </summary>
    public class ExchangeModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="marketData">All market data for the exchange.</param>
        public ExchangeModel(Enums.Exchange exchange, List<MarketModel> marketData)
        {
            Exchange = exchange.ToString();
            Data = marketData;
            Time = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss:ff");
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public string Exchange { get; }

        /// <summary>
        /// All market data for the exchange.
        /// </summary>
        public List<MarketModel> Data { get; }

        /// <summary>
        /// Request time.
        /// </summary>
        public string Time { get; }
    }
}
