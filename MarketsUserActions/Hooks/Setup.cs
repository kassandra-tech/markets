using KassandraWebTest.Framework;

using TechTalk.SpecFlow;

namespace KassandraAccountUserActions.Hooks
{
    /// <summary>
    /// Base for all tests to initialize and teardown tests.
    /// </summary>
    [Binding]
    public class Setup
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public Setup(Browser browser)
        {
            Browser = browser;
        }

        /// <summary> 
        /// Close the driver after test completion. 
        /// </summary> 
        [After]
        public void Dispose()
        {
            Browser.Dispose();
        }

        /// <summary>
        /// Allows interacting with websites.
        /// </summary>
        public Browser Browser { get; private set; }
    }
}
