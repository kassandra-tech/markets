import type { NextPage } from 'next'
import MarketDataTable from "../components/market-data-table/market-data-table";
import Image from 'next/image';
import placeholder from '../public/Header main.png';
import Head from "next/head";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Currencies} from "../services/constants";
import ExpandableRow from "../components/market-data-table/components/expandable-row";
import {getCurrencies, getFavorites, getMarkets, getMarketsData} from "../services/market.api.service";
import {MarketDataResponseModel} from "../models/MarketDataModel";
import MarketRow from "../components/market-data-table/components/MarketRow";

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
    },
    {
        name: 'Rank',
        sortable: true,
        dataField: 'rank',
        withInfo: true,
    },
    {
        name: 'Rating',
        sortable: true,
        dataField: 'rating',
        withInfo: true,
    },
    {
        name: 'Price',
        sortable: true,
        dataField: 'price',
    },
    {
        name: 'Range',
        sortable: true,
        dataField: 'highPrice',
    },
    {
        name: 'Indicator',
        sortable: true,
        dataField: 'percentage',
    },
    {
        name: 'Volume',
        sortable: true,
        width: 200,
        dataField: 'volume',
    },
    {
        name: 'Exchanges',
        //sortable: true,
        width: 240,
        dataField: 'exchanges',
    },
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

const Market: NextPage = () => {

    const [marketData, setMarketData] = useState<MarketDataResponseModel[]>([]);

    useEffect(() => {
        void loadCurrencies();
        void loadMarkets();
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
        setMarketData(response);
        console.log('favorites response', response);
    }

    const loadData = async (marketsFilter = 1) => {
        const response: MarketDataResponseModel[] = await getMarketsData(marketsFilter);
        setMarketData(response);
        console.log('datatable data response', response);
    }

    const filterChange = async (value: number) => {
        console.log('filterChange: ', value);
        await loadData(value);
    }

    // console.log('market Data,', marketData);
    return (
        <>
            <Head>
                <title>Cassandra Market</title>
            </Head>
            {<StyledPageContainer>
                <Image src={placeholder} alt='header'/>
                <MarketDataTable
                    columns={columns}
                    data={marketData}
                    filters={filters}
                    expandable={true}
                    expandableComponent={<ExpandableRow />}
                    rowComponent={<MarketRow/>}
                    filtersChange={filterChange}
                    loadFavorites={loadFavorites}
                    getSortingFieldValue={(item: any, field: string) => item.data[0][field] }
                />
            </StyledPageContainer>}
        </>
    )
}

export default Market;
