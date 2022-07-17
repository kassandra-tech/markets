module.exports = {
    get: {
      tags: ["Markets"],
      description: "Available currencies.",
      operationId: "/routes/markets/currencies",
      parameters: [],
      responses: {
        200: {
          description: "Supported currencies",
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
  