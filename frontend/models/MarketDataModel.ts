export interface MarketDataModel {
    market: string;
    currency: string;
    quoteCurrency: string;
    currencyName: string | null;
    price: number;
    quotePrice: number;
    lowPrice: number;
    highPrice: number;
    volume: number;
    percentage: number;
    label: string;
    rank: number;
    rating: string; // maybe should be enum
    exchanges: string[];
}

export interface MarketDataResponseModel {
    exchange: string;
    data: MarketDataModel[];
    time: string;
}