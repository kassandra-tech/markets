using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace MarketsInterface
{
    /// <summary>
    /// Main entry point for the service.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// Start the service.
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        /// <summary>
        /// Configure host details.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
