module.exports = {
    get: {
      tags: ["Markets"],
      description: "Current Prices",
      operationId: "/routes/markets/price",
      parameters: [],
      responses: {
        200: {
          description: "Current market price",
          content: {
            "application/json": {
              schema: {
                "type": "string",
              },
            },
          },
          500: {
            description: "Server error",
          },
        },
      },
    },

    get: {
      tags: ["Markets"],
      description: "Current Prices Information",
      operationId: "/routes/markets/prices",
      parameters: [],
      responses: {
        200: {
          description: "Market price information",
          content: {
            "application/json": {
              schema: {
                "type": "string",
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
  