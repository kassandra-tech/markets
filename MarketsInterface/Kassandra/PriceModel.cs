namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Market price information.
    /// </summary>
    public class PriceModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market.</param>
        /// <param name="price">Price for the market.</param>
        /// <param name="quotePrice">Reference price for the market.</param>
        public PriceModel(Exchanges exchange, string market, double price, double quotePrice)
        {
            Exchange = exchange;
            Market = market;
            Price = price;
            QuotePrice = quotePrice;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public Exchanges Exchange { get; }

        /// <summary>
        /// Market.
        /// </summary>
        public string Market { get; }

        /// <summary>
        /// Price for the market.
        /// </summary>
        public double Price { get; }

        /// <summary>
        /// Reference price for the market.
        /// </summary>
        public double QuotePrice { get; }
    }
}
