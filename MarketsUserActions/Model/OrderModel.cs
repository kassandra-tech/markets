using KassandraWebTest.Kassandra;

namespace KassandraMarketsUserActions.Model
{
    /// <summary>
    /// Order data representation.
    /// </summary>
    public class OrderModel
    {
        /// <summary>
        /// Identifier for the record.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Time the order was created.
        /// </summary>
        public string CreationDate { get; set; }

        /// <summary>
        /// Time the order was closed.
        /// </summary>
        public string ClosedDate { get; set; }

        /// <summary>
        /// ExchangeType the order was placed on.
        /// </summary>
        public Exchanges Exchange { get; set; }

        /// <summary>
        /// Type of trade.
        /// </summary>
        public TradeAction Action { get; set; }

        /// <summary>
        /// Market the order was placed in.
        /// </summary>
        public string Market { get; set; }

        /// <summary>
        /// Quantity of the order.
        /// </summary>
        public double Amount { get; set; }

        /// <summary>
        /// Quantity of the order complete.
        /// </summary>
        public double QuantityFilled { get; set; }

        /// <summary>
        /// Price of the order.
        /// </summary>
        public double Price { get; set; }

        /// <summary>
        /// Total cost of the order.
        /// </summary>
        public double Total { get; set; }

        /// <summary>
        /// Fee for the order.
        /// </summary>
        public double Fee { get; set; }
    }
}