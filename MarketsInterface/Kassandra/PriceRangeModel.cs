using System;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Market price information.
    /// </summary>
    public class PriceRangeModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        public PriceRangeModel(ExchangeType exchange, string market, DateTime startTime, DateTime endTime)
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
    }
}
