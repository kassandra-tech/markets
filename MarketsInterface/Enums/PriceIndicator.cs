using System.ComponentModel;

namespace MarketsInterface.Enums
{
    /// <summary>
    /// Price indicator labels.
    /// </summary>
    public enum PriceIndicator
    {
        /// <summary>
        /// Strong Buy
        /// </summary>
        [Description("Strong Buy")]
        StrongBuy = 1,
        /// <summary>
        /// Buy
        /// </summary>
        Buy,
        /// <summary>
        /// Hold
        /// </summary>
        Hold,
        /// <summary>
        /// Sell
        /// </summary>
        Sell,
        /// <summary>
        /// Strong Sell
        /// </summary>
        [Description("Strong Sell")]
        StrongSell
    }
}
