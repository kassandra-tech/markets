import type { NextPage } from 'next'
import MarketDataTable from "../components/market-data-table/market-data-table";
import Image from 'next/image';
import placeholder from '../public/Header main.png';
import Head from "next/head";
import React, {useEffect} from "react";
import styled from "styled-components";
import MarketCell from "../components/market-data-table/components/cells/market-cell";
import {Currencies} from "../services/constants";
import MainMarketCell from "../components/market-data-table/components/cells/main-market-cell";
import IndicatorCell from "../components/market-data-table/components/cells/indicator-cell";
import {VolumeCell} from "../components/market-data-table/components/cells/volume-cell";
import ExchangesCell from "../components/market-data-table/components/cells/exchanges-cell";
import ExpandableRow from "../components/market-data-table/components/expandable-row";
import {getCurrencies, getFavorites, getMarkets, getMarketsData} from "../services/market.api.service";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const columns = [
    {
        name: 'Market',
        sortable: true,
        width: 200,
        dataField: 'market',
        cell: MarketCell
    },
    {
        name: 'Rank',
        sortable: true,
        dataField: 'rank',
        withInfo: true,
        cell: MainMarketCell
    },
    {
        name: 'Rating',
        sortable: true,
        dataField: 'rating',
        withInfo: true,
        cell: MainMarketCell
    },
    {
        name: 'Price',
        sortable: true,
        dataField: 'price',
        cell: MainMarketCell
    },
    {
        name: 'Range',
        sortable: true,
        dataField: 'range',
        cell: MainMarketCell
    },
    {
        name: 'Indicator',
        sortable: true,
        dataField: 'indicator',
        cell: IndicatorCell
    },
    {
        name: 'Volume',
        sortable: true,
        width: 200,
        dataField: 'volume',
        cell: VolumeCell
    },
    {
        name: 'Exchanges',
        sortable: true,
        width: 210,
        dataField: 'exchanges',
        cell: ExchangesCell
    },
];

const data = [
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

const filters = [
    {
        name: 'BTC',
        value: Currencies.btc
    },
    {
        name: 'USD',
        value: Currencies.usd
    },
    {
        name: 'USDT',
        value: Currencies.usdt
    },
    {
        name: 'ETH',
        value: Currencies.eth
    },
    {
        name: 'BNB',
        value: Currencies.bnb
    },
];

const Home: NextPage = () => {

    useEffect(() => {
        void loadCurrencies();
        void loadMarkets();
        void loadFavorites();
        void loadData();
    }, [])

    const loadCurrencies = async () => {
        const response = await getCurrencies();
        console.log('currencies response', response);
    }
    const loadMarkets = async () => {
        const response = await getMarkets();
        console.log('markets response', response);
    }
    const loadFavorites = async () => {
        const response = await getFavorites();
        console.log('favorites response', response);
    }

    const loadData = async () => {
        const response = await getMarketsData();
        console.log('datatable data response', response);
    }

    return (
        <>
            <Head>
                <title>Cassandra Market</title>
            </Head>
            {<StyledPageContainer>
                <Image src={placeholder} alt='header'/>
                <MarketDataTable
                    columns={columns}
                    data={data}
                    filters={filters}
                    expandable={true}
                    expandableComponent={ExpandableRow}
                    filterField="market"
                />
            </StyledPageContainer>}
        </>
    )
}

export default Home;
