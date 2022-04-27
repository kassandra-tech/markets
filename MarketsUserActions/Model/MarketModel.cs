namespace KassandraMarketsUserActions.Model
{
    /// <summary>
    /// Information about currencies for the given market.
    /// </summary>
    public class MarketModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="market">Market.</param>
        public MarketModel(string market)
        {

        }

        /// <summary>
        /// Currency being purchased in the market.
        /// </summary>
        public string Currency { get; }

        /// <summary>
        /// Currency being sold in the market.
        /// </summary>
        public string QuoteCurrency { get; }

        /// <summary>
        /// Full name of the primary currency in the market.
        /// </summary>
        public string CurrencyName { get; }

        /// <summary>
        /// Is the market part of the members market favorite list?
        /// </summary>
        public bool IsFavorite { get; set; }
    }
}
