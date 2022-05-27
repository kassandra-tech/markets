using System;

using MarketsInterface.Enums;

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
        public PriceRangeModel(Enums.Exchanges exchange)
        {
            Exchange = exchange;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public Enums.Exchanges Exchange { get; }

        /// <summary>
        /// Market.
        /// </summary>
        public string Market { get; set; }

        /// <summary>
        /// First day in the date range.
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Last day in the date range.
        /// </summary>
        public DateTime EndTime { get; set; }

        /// <summary>
        /// Get the last market price.
        /// </summary>
        public double Price { get; set; }

        /// <summary>
        /// Lowest price in the time range.
        /// </summary>
        public double LowPrice { get; set; }

        /// <summary>
        /// Highest price in the time range.
        /// </summary>
        public double HighPrice { get; set; }
    }
}
