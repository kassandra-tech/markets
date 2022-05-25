namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Information about currencies for the given market.
    /// </summary>
    public class MarketModel
    {
        /// <summary>
        /// Formatted market string.
        /// </summary>
        public string Market => $"{Currency}-{QuoteCurrency}".ToUpper();

        /// <summary>
        /// Currency being purchased in the market.
        /// USD is the currency in the BTC-USD market.
        /// </summary>
        public string Currency { get; set; }

        /// <summary>
        /// Currency being sold in the market.
        /// BTC is the quote currency in the BTC-USD market.
        /// </summary>
        public string QuoteCurrency { get; set; }

        /// <summary>
        /// Full name of the quote currency in the market.
        /// </summary>
        public string CurrencyName { get; set; }
    }
}
