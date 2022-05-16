import {CellStyles} from "../../styled/cell.styles";
import Indicator from "../indicator";
import {useContext} from "react";
import styled, {ThemeContext} from "styled-components";

interface SpanProps {
    justify?: string;
}

const SpanStyles = styled.span<SpanProps>`
  font-size: 10px;
  margin-bottom: 3px;
  color: ${props => props.theme.colors.grey};
  width: 90px;
  display: inline-flex;
  justify-content: ${({justify}: SpanProps) => justify ? justify : 'center'};;
  span {
    color: ${props => props.color}
  }
`


export interface IndicatorCellProps {
    width: number,
    value: number;
}


export default function IndicatorCell({width, value}: IndicatorCellProps) {
    const {colors} = useContext(ThemeContext)

    // todo define percentage and rewrite.
    const isSell = value > 66;
    const isStrongSell = value > 90;
    const isBuy = value < 40;
    const isStrongBuy = value > 20 && value < 40;
    const color = isBuy ? colors.cryptoGreen : isSell ? colors.superRed : colors.yellow;
    console.log('isSell', isSell, 'isBuy', isBuy, color);

    const justify =  isBuy ? 'start' : isSell ? 'end' : 'center';

    return <CellStyles width={width} direction="column">
        <SpanStyles color={color} justify={justify}>
            {isBuy && <>
                <span>+{value}%&nbsp;</span>
                {isStrongBuy ? `Strong ` : ''}
                Buy
            </>}
            {isSell && <>
                {isStrongSell ? 'Strong ' : ''}
                Sell&nbsp;
                <span>-{value}%</span>
            </>}
            {(!isBuy && !isSell) && <>
                <span>{value}%&nbsp;</span>
                Hold
            </>}
        </SpanStyles>

        <Indicator value={value}/>
    </CellStyles>
}