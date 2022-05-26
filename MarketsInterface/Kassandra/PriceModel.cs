namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Market price information.
    /// </summary>
    public class PriceModel
    {
        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public ExchangeType Exchange { get; set; }

        /// <summary>
        /// Market.
        /// </summary>
        public string Market { get; set; }

        /// <summary>
        /// Price for the market.
        /// </summary>
        public double Price { get; set; }

        /// <summary>
        /// Reference price for the market.
        /// </summary>
        public double QuotePrice { get; set; }
    }
}
