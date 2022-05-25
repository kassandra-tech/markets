using System;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Determine the current market price value compared to the given date range.
    /// </summary>
    public class PriceIndicatorModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="market">Market.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        public PriceIndicatorModel(string market, DateTime startTime, DateTime endTime, ExchangeType exchange = 0)
        {
            Exchange = exchange;
            Market = market;
            StartTime = startTime;
            EndTime = endTime;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public ExchangeType Exchange { get; }

        /// <summary>
        /// Market.
        /// </summary>
        public string Market { get; }

        /// <summary>
        /// First day in the date range.
        /// </summary>
        public DateTime StartTime { get; }

        /// <summary>
        /// Last day in the date range.
        /// </summary>
        public DateTime EndTime { get; }

        /// <summary>
        /// Current price given the provided date range.
        /// </summary>
        public double Percentage { get; }

        /// <summary>
        /// Text representation of the percentage to determine if the current price is good for buying or selling.
        /// </summary>
        public string Label { get; }
    }
}
