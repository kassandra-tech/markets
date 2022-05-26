using System;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Market price information.
    /// </summary>
    public class PriceVolumeModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        public PriceVolumeModel(ExchangeType exchange)
        {
            Exchange = exchange;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public ExchangeType Exchange { get; }

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
        public double Volume { get; set; }
    }
}
