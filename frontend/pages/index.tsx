import type { NextPage } from 'next'
import MarketDataTable from "../components/market-data-table/market-data-table";
import Image from 'next/image';
import placeholder from '../public/Header main.png';
import Head from "next/head";
import React, {useEffect, useState} from "react";
import styled from "styled-components";

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
        dataField: 'market'
    },
    {
        name: 'Rank',
        sortable: true,
        dataField: 'rank'
    },
    {
        name: 'Rating',
        sortable: true,
        dataField: 'rating'
    },
    {
        name: 'Price',
        sortable: true,
        dataField: 'price'
    },
    {
        name: 'Range',
        sortable: true,
        width: 150,
        dataField: 'range'
    },
    {
        name: 'Indicator',
        sortable: true,
        width: 150,
        dataField: 'indicator'
    },
    {
        name: 'Volume',
        sortable: true,
        width: 150,
        dataField: 'volume'
    },
    {
        name: 'Exchanges',
        sortable: true,
        width: 210,
        dataField: 'exchanges'
    },
];

const data = [
    {
        id: 1,
        market: 'Bitcoin',
        rank: 1,
        rating: 'AAA',
        price: 39624.49,
        range: 39624.49,
        indicator: 25,
        volume: 23669395398.55,
        exchanges: ''
    },
    {
        id: 2,
        market: 'Ethereum',
        rank: 2,
        rating: 'BBB',
        price: 2889.43,
        range: 2905.45,
        indicator: 50,
        volume: 17088996369.48,
        exchanges: ''
    },
    {
        id: 3,
        market: 'BNB',
        rank: 4,
        rating: 'BBB',
        price: 384.44,
        range: 384.60,
        indicator: 75,
        volume: 1427814561.55,
        exchanges: ''
    }
]


const Home: NextPage = () => {

    const [isSSR, setIsSSR] = useState(true);
    // https://github.com/vercel/next.js/discussions/35773#discussioncomment-2485078
    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        <>
            <Head>
                <title>Cassandra Market</title>
            </Head>
            {!isSSR && <StyledPageContainer>
                <Image src={placeholder} alt='header'/>
                <MarketDataTable
                    columns={columns}
                    data={data}
                />
            </StyledPageContainer>}
        </>
    )
}

export default Home;
