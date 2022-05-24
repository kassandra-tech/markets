using System;
using System.Collections.Generic;

using MarketsInterface.Kassandra;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MarketsInterface.Controllers
{
    /// <summary>
    /// APIs to support Kassandra markets.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class MarketsController : ControllerBase
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger">Log output for the controller.</param>
        public MarketsController(ILogger<MarketsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Get available markets for the given exchange.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("markets")]
        public List<MarketModel> Markets(Exchanges exchange = 0)
        {
            return new List<MarketModel>();
        }

        /// <summary>
        /// Get current orderbook for open buy and sell orders for the given market on the selected exchange.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("orderbook")]
        public OrderbookModel Orderbook(Exchanges exchange, string market)
        {
            var orders = new List<OrderModel>();
            
            return new OrderbookModel(exchange, market, orders, orders);
        }

        /// <summary>
        /// Get market price for the given market on the selected exchange.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/price")]
        public PriceModel Price(Exchanges exchange, string market)
        {
            return new PriceModel(exchange, market, 0, 0);
        }

        /// <summary>
        /// Get the market price range for the given timeframe.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="market">Market to retrieve data from.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/price/range")]
        public PriceRangeModel PriceRange(Exchanges exchange, string market, DateTime startTime, DateTime endTime)
        {
            return new PriceRangeModel(exchange, market, startTime, endTime);
        }

        /// <summary>
        /// Get the volume for a given market.
        /// If an exchange is passed the volume for the given exchange will be returned.
        /// </summary>
        /// <param name="market">Market to retrieve data from.</param>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/volume")]
        public double Volume(string market, Exchanges exchange = 0)
        {
            return 0;
        }

        /// <summary>
        /// Determine the current market price value compared to the given date range.
        /// </summary>
        /// <param name="market">Market to retrieve data from.</param>
        /// <param name="startTime">First day in the date range.</param>
        /// <param name="endTime">Last Day in the date range.</param>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/price/indicator")]
        public PriceIndicatorModel PriceIndicator(string market, DateTime startTime, DateTime endTime, Exchanges exchange = 0)
        {
            return new PriceIndicatorModel(market, startTime, endTime, exchange);
        }

        /// <summary>
        /// Exchange states for a given market.
        /// </summary>
        /// <param name="market">Market to retrieve data from.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/exchanges")]
        public MarketModel Exchanges(string market)
        {
            return new MarketModel(market);
        }

        /// <summary>
        /// Get the rank of the given market.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="currency">Currency to get the rank of.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/rank")]
        public int Rank(Exchanges exchange, string currency)
        {
            var random = new Random();

            return random.Next(1, 10000);
        }

        /// <summary>
        /// Get the rating of the given currency.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="currency">Currency to get the rating of.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("market/rating")]
        public string Rating(Exchanges exchange, string currency)
        {
            return "A";
        }

        private readonly ILogger<MarketsController> _logger;
    }
}
