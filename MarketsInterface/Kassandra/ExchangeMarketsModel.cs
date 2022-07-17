using System.Collections.Generic;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Coorelate Markets per Exchange.
    /// </summary>
    public class ExchangeMarketsModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange reference.</param>
        /// <param name="markets">Markets for the associated exchange.</param>
        public ExchangeMarketsModel(Enums.Exchange exchange, List<MarketNameModel> markets)
        {
            Exchange = exchange.ToString();
            Markets = markets;
        }

        /// <summary>
        /// Exchange.
        /// </summary>
        public string Exchange { get; }

        /// <summary>
        /// Markets for the associated Exchange.
        /// </summary>
        public List<MarketNameModel> Markets { get; } 
    }
}
