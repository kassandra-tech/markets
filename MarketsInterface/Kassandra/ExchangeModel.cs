namespace MarketsInterface.Kassandra
{
    /// <summary>
    /// Data for viewing exchange information by member selection.
    /// </summary>
    public class ExchangeModel
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="exchange">Exchange from supported exchange list to retrieve data from.</param>
        /// <param name="connected">Does the member have an account connected for the exchange?</param>
        /// <param name="enabled">Has the member decided to view the current excahnge?</param>
        public ExchangeModel(Exchanges exchange, bool connected, bool enabled)
        {
            Exchange = exchange;
            Connected = connected;
            Enabled = enabled;
        }

        /// <summary>
        /// Exchange from supported exchange list to retrieve data from.
        /// </summary>
        public Exchanges Exchange { get; }

        /// <summary>
        /// Does the member have an account connected for the exchange?
        /// </summary>
        public bool Connected { get; }

        /// <summary>
        /// Has the member decided to view the current excahnge?
        /// </summary>
        public bool Enabled { get; }
    }
}
