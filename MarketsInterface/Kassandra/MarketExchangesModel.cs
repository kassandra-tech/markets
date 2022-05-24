using System.Collections.Generic;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Exchange states for a given market.
    /// </summary>
    public class MarketExchangesModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="market">Exchange from supported exchange list to retrieve data from.</param>
        public MarketExchangesModel(string market)
        {
            Exchanges = new List<ExchangeModel>();
        }

        /// <summary>
        /// Exchange list for a given market.
        /// </summary>
        public List<ExchangeModel> Exchanges { get; }
    }
}
