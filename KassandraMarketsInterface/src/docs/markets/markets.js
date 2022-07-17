module.exports = {
    get: {
      tags: ["Markets"],
      description: "Available markets.",
      operationId: "./routes/markets/markets",
      parameters: [],
      responses: {
        200: {
          description: "Supported markets",
          content: {
            "application/json": {
              schema: {
                "type": "array",
              },
            },
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    post: {
      tags: ["Markets"],
      description: "Available markets.",
      operationId: "./routes/markets/markets",
      parameters: [],
      responses: {
        200: {
          description: "Supported markets",
          content: {
            "application/json": {
              schema: {
                "type": "array",
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
