module.exports = {
    components: {
        schemas: {
                "Exchange": {
                  "format": "enum",
                  "description": "Supported exchanges.\r\n\r\n1 = Binance\r\n\r\n2 = Coinbase\r\n\r\n3 = KuCoin\r\n\r\n4 = HuobiGlobal\r\n\r\n5 = FTX\r\n\r\n6 = Kraken\r\n\r\n7 = Bittrex",
                  "enum": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                  ],
                  "type": "enum",
                  "x-enumNames": [
                    "Binance",
                    "Coinbase",
                    "KuCoin",
                    "HuobiGlobal",
                    "FTX",
                    "Kraken",
                    "Bittrex"
                  ]
                },
                "MarketFilters": {
                  "format": "int32",
                  "description": "Supported exchanges.\r\n\r\n1 = All\r\n\r\n2 = Favorites\r\n\r\n3 = BTC\r\n\r\n4 = USD\r\n\r\n5 = USDT\r\n\r\n6 = ETH\r\n\r\n7 = BNB",
                  "enum": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                  ],
                  "type": "enum",
                  "x-enumNames": [
                    "All",
                    "Favorites",
                    "BTC",
                    "USD",
                    "USDT",
                    "ETH",
                    "BNB"
                  ]
                },
                "ExchangeMarketsModel": {
                  "description": "Coorelate Markets per Exchange.",
                  "type": "object",
                  "properties": {
                    "exchange": {
                      "description": "Exchange.",
                      "type": "string"
                    },
                    "markets": {
                      "description": "Markets for the associated Exchange.",
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/MarketNameModel"
                      }
                    }
                  }
                },
                "ExchangeModel": {
                  "description": "Data for viewing exchange information by member selection.",
                  "type": "object",
                  "properties": {
                    "exchange": {
                      "description": "Exchange from supported exchange list to retrieve data from.",
                      "type": "string"
                    },
                    "data": {
                      "description": "All market data for the exchange.",
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/MarketModel"
                      },
                      "readOnly": true
                    }
                  }
                },
                "MarketModel": {
                  "description": "Market information..",
                  "type": "object",
                  "properties": {
                    "market": {
                      "description": "Formatted market string.",
                      "type": "string",
                      "readOnly": true
                    },
                    "currency": {
                      "description": "Currency being purchased in the market.\r\nUSD is the currency in the BTC-USD market.",
                      "type": "string",
                      "readOnly": true
                    },
                    "quoteCurrency": {
                      "description": "Currency being sold in the market.\r\nBTC is the quote currency in the BTC-USD market.",
                      "type": "string",
                      "readOnly": true
                    },
                    "currencyName": {
                      "description": "Full name of the quote currency in the market.",
                      "type": "string"
                    },
                    "price": {
                      "format": "double",
                      "description": "Price for the market.",
                      "type": "number"
                    },
                    "quotePrice": {
                      "format": "double",
                      "description": "Reference price",
                      "type": "number"
                    },
                    "lowPrice": {
                      "format": "double",
                      "description": "Lowest price in the time range.",
                      "type": "number"
                    },
                    "highPrice": {
                      "format": "double",
                      "description": "Highest price in the time range.",
                      "type": "number"
                    },
                    "volume": {
                      "format": "double",
                      "description": "Amount traded in the market.",
                      "type": "number"
                    },
                    "percentage": {
                      "format": "double",
                      "description": "Current price given the provided date range.",
                      "type": "number"
                    },
                    "label": {
                      "description": "Text representation of the percentage to determine if the current price is good for buying or selling.",
                      "type": "string"
                    },
                    "rank": {
                      "format": "int32",
                      "description": "The rank of the currency by market capitalization.",
                      "type": "integer"
                    },
                    "rating": {
                      "description": "Currency rating.",
                      "type": "string"
                    },
                    "exchanges": {
                      "description": "Exchanges that trade this market.",
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Exchange"
                      },
                    }
                  }
                },
                "MarketNameModel": {
                  "description": "Information about currencies for the given market.",
                  "type": "object",
                  "properties": {
                    "market": {
                      "description": "Formatted market string.",
                      "type": "string",
                      "readOnly": true
                    },
                    "name": {
                      "description": "Name of the market on the exchange.",
                      "type": "string"
                    },
                    "currency": {
                      "description": "Currency being purchased in the market.\r\nUSD is the currency in the BTC-USD market.",
                      "type": "string"
                    },
                    "quoteCurrency": {
                      "description": "Currency being sold in the market.\r\nBTC is the quote currency in the BTC-USD market.",
                      "type": "string"
                    },
                    "currencyName": {
                      "description": "Full name of the quote currency in the market.",
                      "type": "string"
                    }
                }
            }
        }
    }
}
