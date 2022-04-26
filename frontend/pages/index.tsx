import type { NextPage } from 'next'
import MarketDataTable from "../components/market-data-table";
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
                <MarketDataTable />
            </StyledPageContainer>}
        </>
    )
}

export default Home;
