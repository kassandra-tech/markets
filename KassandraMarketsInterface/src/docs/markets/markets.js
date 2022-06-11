module.exports = {
    get: {
      tags: ["Markets"],
      description: "Available markets.",
      operationId: "./routes/markets/markets",
      parameters: [
        {
          "name" : "exchangesFilter",
          "in": "query",
          "type": "string",
          "description": "Exchanges to get data from. Available options are Binance,Coinbase,KuCoin,HuobiGlobal,FXT,Kraken,Bittrex.\n\nMultiple exchanges can be searched for example: Binance,Coinbase",
          "required" : false
        }
      ],
      responses: {
        200: {
          description: "Supported markets",
          content: {
            "application/json": {
              schema: {
                "type": "array",
                "items": {
                  "string": ""
                },
              },
            },
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  };
