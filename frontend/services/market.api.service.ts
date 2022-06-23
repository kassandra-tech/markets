import {CurrenciesData} from "../public/data/currencies-data";
import marketResponse from '../public/data/markets.response.json';
import marketsDataResponse from '../public/data/markets-data.response.json';
import {MarketDataModel, MarketDataResponseModel} from "../models/MarketDataModel";

const headers = new Headers();

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin','http://localhost:3000');

export async function getCurrencies() {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/currencies`, {
            credentials: 'include',
            mode: 'cors',
            headers
        }).then(res => res.json());
    } catch(_) {
        return CurrenciesData;
    }
}

export async function getMarkets(): Promise<any> {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets`, {
            credentials: 'include',
            mode: 'cors',
            headers
        }).then(res => res.json());
    } catch(_) {
        return marketResponse;
    }
}

export async function getMarketsData(marketsFilter = 1 ): Promise<MarketDataResponseModel[]> {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/data?marketsFilter=${marketsFilter}`, {
            credentials: 'include',
            mode: 'cors',
            headers
        }).then(res => res.json());
    } catch(_) {
        return Promise.resolve(marketsDataResponse);
    }
}

export async function getFavorites(): Promise<MarketDataResponseModel[]> {
    try {
        return await fetch(`${process.env.NEXT_PUBLIC_HOST}/markets/favorites`, {
            credentials: 'include',
            mode: 'cors',
            headers
        }).then(res => res.json());
    } catch(_) {
        return Promise.resolve([]);
    }
}