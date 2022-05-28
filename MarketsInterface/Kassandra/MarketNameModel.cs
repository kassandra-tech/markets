namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Information about currencies for the given market.
    /// </summary>
    public class MarketNameModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="name">Name and format of the market on the exchange.</param>
        /// <param name="currency"></param>
        /// <param name="quoteCurrency">Currency being purchased in the market.</param>
        /// <param name="currencyName">Currency being sold in the market.</param>
        public MarketNameModel(string name, string currency, string quoteCurrency, string currencyName)
        {
            Name = name;
            Currency = currency.ToUpper();
            QuoteCurrency = quoteCurrency.ToUpper();
            CurrencyName = currencyName;
        }

        /// <summary>
        /// Formatted market string.
        /// </summary>
        public string Market => $"{Currency}-{QuoteCurrency}".ToUpper();

        /// <summary>
        /// Name of the market on the exchange.
        /// </summary>
        public string Name { get; }

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
