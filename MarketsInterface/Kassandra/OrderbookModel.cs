using System.Collections.Generic;

namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Open buy and sell orders for the given market.
    /// </summary>
    public class OrderbookModel
    {
        /// <summary>
        /// Open buy and sell orders for a given market.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market for the orderbook.</param>
        /// <param name="buys">Current buy orders for the market.</param>
        /// <param name="sells">Current sell orders for the market.</param>
        public OrderbookModel(ExchangeType exchange, string market, List<OrderModel> buys, List<OrderModel> sells)
        {
            Exchange = exchange;
            Market = market;
            Buys = buys;
            Sells = sells;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public ExchangeType Exchange { get; }

        /// <summary>
        /// Market for the orderbook.
        /// </summary>
        public string Market { get; }

        /// <summary>
        /// Open buy orders for the market.
        /// </summary>
        public List<OrderModel> Buys { get; }

        /// <summary>
        /// Open sell orders for the market.
        /// </summary>
        public List<OrderModel> Sells { get; }
    }
}
