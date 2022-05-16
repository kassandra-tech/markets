import {CellStyles} from "../../styled/cell.styles";
import Image from 'next/image';
import bnb from '../../../../public/markets/bnb.png';
import exodus from '../../../../public/markets/exodus.png';
import cryptoCom from '../../../../public/markets/crypto-com.png';
import ftx from '../../../../public/markets/ftx.png';
import styled from "styled-components";

const SpanStyles = styled.span`
    font-size: 16px;
    color: ${props => props.theme.colors.secondaryWhite};
`;

export default function ExchangesCell({width}: {width: number}) {
    return <CellStyles width={width} justify="space-around">
        <Image src={bnb} alt='binance'/>
        <Image src={exodus} alt='exodus'/>
        <Image src={cryptoCom} alt='crypto.com'/>
        <Image src={ftx} alt='ftx'/>
        <SpanStyles>+215</SpanStyles>
    </CellStyles>
}