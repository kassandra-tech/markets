import styled from "styled-components";
import {CellStyles} from "../../styled/cell.styles";
import Image, {StaticImageData} from "next/image";
import bnb from "../../../../public/markets/bnb.png";
import exodus from "../../../../public/markets/exodus.png";
import cryptoCom from "../../../../public/markets/crypto-com.png";
import ftx from "../../../../public/markets/ftx.png";
import coinbase from "../../../../public/markets/coinbase.png";
import huobiGlobal from "../../../../public/markets/huobi-global.png";
import {Markets} from "../../../../services/constants";

const ImageContainerStyles = styled.div`
    margin: 0 6px;
    display: inline-flex;
    align-items: center;
`;

const SpanStyles = styled.span`
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
`;

export interface MarketplaceCellProps {
    width: number;
    value: Markets
}

export default function MarketplaceCell({width, value}: MarketplaceCellProps) {

    let icon, name;
    switch (value) {
        case Markets.Binance:
            icon = bnb;
            name = 'Binance';
            break;
        case Markets["Crypto.com"]:
            icon = cryptoCom;
            name = 'Crypto.com';
            break;
        case Markets.FTX:
            icon = ftx;
            name = 'FTX';
            break;
        case Markets.Exodus:
            icon = exodus;
            name = 'Exodus';
            break;
        case Markets["Huobi Global"]:
            icon = huobiGlobal;
            name = 'Huobi Global';
            break;
        case Markets.Coinbase:
            icon = coinbase;
            name = 'Coinbase';
            break;
        default:
            icon = bnb;
            name = 'Binance';
    }

    return <CellStyles width={width} justify="start">
        <ImageContainerStyles>
            <Image src={icon as StaticImageData} alt={name}/>
        </ImageContainerStyles>
        <SpanStyles>{name}</SpanStyles>
    </CellStyles>
}