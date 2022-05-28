using System;
using System.IO;

using MarketsInterface.Exchanges;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

using Unchase.Swashbuckle.AspNetCore.Extensions.Extensions;

namespace MarketsInterface
{
    /// <summary>
    /// Start the service.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="configuration">Configuration.</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            Binance = new();
            Coinbase = new();
            KuCoin = new();
            HuobiGlobal = new();
            Ftx = new();
            Kraken = new();
            Bittrex = new();
    }

        /// <summary>
        /// Configuration.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MarketsInterface", Version = "v1" });
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "MarketsInterface.xml"));
                c.AddEnumsWithValuesFixFilters();
            });
            services.ConfigureSwaggerGen(c =>
            {
                c.CustomSchemaIds(configuration => configuration.FullName);
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MarketsInterface v1"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        internal static Binance Binance { get; private set; }
        internal static Coinbase Coinbase { get; private set; }
        internal static KuCoin KuCoin { get; private set; }
        internal static HuobiGlobal HuobiGlobal { get; private set; }
        internal static Ftx Ftx { get; private set; }
        internal static Kraken Kraken { get; private set; }
        internal static Bittrex Bittrex { get; private set; }
    }
}
