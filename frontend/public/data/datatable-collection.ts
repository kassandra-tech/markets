import {Currencies} from "../../services/constants";

export const data = [
    {
        id: 1,
        market: {
            name: 'Bitcoin',
            id: Currencies.btc
        },
        rank: 1,
        rating: 'AAA',
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 55,
        volume: 23669395398.55,
        exchanges: ''
    },
    {
        id: 2,
        market: {
            name: 'Ethereum',
            id: Currencies.eth
        },
        rank: 2,
        rating: 'BBB',
        price: [2889.43, 2887.43],
        range: [2905.45, 2711.32],
        indicator: 50,
        volume: 17088996369.48,
        exchanges: ''
    },
    {
        id: 3,
        market: {
            name: 'Binance',
            id: Currencies.bnb
        },
        rank: 4,
        rating: 'BBB',
        price: [384.44, 382.01],
        range: [384.60, 321.15],
        indicator: 75,
        volume: 1427814561.55,
        exchanges: ''
    },
    {
        id: 3,
        market: {
            name: 'USDT',
            id: Currencies.usdt
        },
        rank: 4,
        rating: 'CCC',
        price: [384.44, 382.01],
        range: [384.60, 321.15],
        indicator: 75,
        volume: 1427814561.55,
        exchanges: ''
    }
];