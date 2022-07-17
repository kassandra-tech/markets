using System;
using System.Collections.Generic;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Market information..
    /// </summary>
    public class MarketModel
    {
        /// <summary>
        /// Constructor.
        /// NOTE: When (QuotePrice = 0 and LowPrice = 0 and HighPrice = 0 and Volume = 0 and Percentage = 0 and Label = 0 and Rank = 0, and Rating = "Z")
        /// All properties will be randomly generated.
        /// </summary>
        /// <param name="marketModel">Name information about the market.</param>
        /// <param name="price">Current market price.</param>
        /// <param name="quotePrice">Current market price in the qutoe currency.</param>
        /// <param name="lowPrice">Lowest price for the time range.</param>
        /// <param name="highPrice">Highest price for the time range.</param>
        /// <param name="volume">Volume for the time range.</param>
        /// <param name="percentage">Percentage from the highest or lowest price for the time range.</param>
        /// <param name="label">Trade indicator based on the current price, low, and high prices for the time range.</param>
        /// <param name="rank">Rank based on currency market capitalization.</param>
        /// <param name="rating">Rating for the currency.</param>
        /// <param name="exchanges">Exchanges that trade this market.</param>
        public MarketModel(MarketNameModel marketModel,
                          double price,
                          double quotePrice = 0,
                          double lowPrice = 0,
                          double highPrice = 0,
                          double volume = 0,
                          double percentage = 0,
                          string label = "",
                          int rank = 0,
                          string rating = "",
                          List<string> exchanges = null)
        {
            MarketInformation = marketModel;
            Price = price;
            QuotePrice = quotePrice;
            LowPrice = lowPrice;
            HighPrice = highPrice;
            Volume = volume;
            Percentage = percentage;
            Label = label;
            Rank = rank;
            Rating = rating;
            Exchanges = exchanges != null ? exchanges : new List<string>();

            // TODO: Temporary for testing.
            if (QuotePrice == 0 && LowPrice == 0 && HighPrice == 0 && Volume == 0 && Percentage == 0 && Label == string.Empty && Rank == 0 && Rating == string.Empty)
            {
                TestSetup();
            }
        }

        /// <summary>
        /// Formatted market string.
        /// </summary>
        public string Market => $"{Currency}-{QuoteCurrency}".ToUpper();

        /// <summary>
        /// Currency being purchased in the market.
        /// USD is the currency in the BTC-USD market.
        /// </summary>
        public string Currency => MarketInformation?.Currency;

        /// <summary>
        /// Currency being sold in the market.
        /// BTC is the quote currency in the BTC-USD market.
        /// </summary>
        public string QuoteCurrency => MarketInformation?.QuoteCurrency;

        /// <summary>
        /// Full name of the quote currency in the market.
        /// </summary>
        public string CurrencyName { get; set; }

        /// <summary>
        /// Price for the market.
        /// </summary>
        public double Price { get; }

        /// <summary>
        /// Reference price
        /// </summary>
        public double QuotePrice { get; set; }

        /// <summary>
        /// Lowest price in the time range.
        /// </summary>
        public double LowPrice { get; set; }

        /// <summary>
        /// Highest price in the time range.
        /// </summary>
        public double HighPrice { get; set; }

        /// <summary>
        /// Amount traded in the market.
        /// </summary>
        public double Volume { get; set; }

        /// <summary>
        /// Current price given the provided date range.
        /// </summary>
        public double Percentage { get; set; }

        /// <summary>
        /// Text representation of the percentage to determine if the current price is good for buying or selling.
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// The rank of the currency by market capitalization.
        /// </summary>
        public int Rank { get; set; }

        /// <summary>
        /// Currency rating.
        /// </summary>
        public string Rating { get; set; }

        /// <summary>
        /// Exchanges that trade this market.
        /// </summary>
        public List<string> Exchanges { get; set; }

        private MarketNameModel MarketInformation { get; }

        /// <summary>
        /// Provide data for UI testing.
        /// TODO: Remove and implement for real.
        /// </summary>
        private void TestSetup()
        {
            var random = new Random();
            var indicator = (Enums.PriceIndicator)random.Next(1, 5);
            var ratings = new List<string> { "A", "B", "C", "D", "E", "F" };

            QuotePrice = random.NextDouble() * Price;
            LowPrice = random.NextDouble() * (Price - Price * 0.8) + Price * 0.8;
            HighPrice = random.NextDouble() * (Price * 1.2 - Price) + Price;
            Volume = random.NextDouble() * Price * 10000;
            Percentage = random.NextDouble() + 1;
            Label = indicator.ToString();
            Rank = random.Next(1, 10000);
            Rating = ratings[random.Next(ratings.Count)];
        }
    }
}
