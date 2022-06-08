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
    value: {
        percentage: number;
        label: string;
    };
}


export default function IndicatorCell({width, value}: IndicatorCellProps) {
    const {colors} = useContext(ThemeContext)

    // todo define percentage.
    const isSell = value.percentage > 66;
    const isStrongSell = value.percentage > 90;
    const isBuy = value.percentage < 40;
    const isStrongBuy = value.percentage > 20 && value.percentage < 40;
    const color = isBuy ? colors.cryptoGreen : isSell ? colors.superRed : colors.yellow;
    const justify =  isBuy ? 'start' : isSell ? 'end' : 'center';

    return <CellStyles width={width} direction="column">
        <SpanStyles color={color} justify={justify}>
            {isBuy && <>
                <span>+{value.percentage.toFixed(2)}%&nbsp;</span>
                {isStrongBuy ? `Strong ` : ''}
                Buy
            </>}
            {isSell && <>
                {isStrongSell ? 'Strong ' : ''}
                Sell&nbsp;
                <span>-{value.percentage.toFixed(2)}%</span>
            </>}
            {(!isBuy && !isSell) && <>
                <span>{value.percentage.toFixed(2)}%&nbsp;</span>
                Hold
            </>}
        </SpanStyles>

        <Indicator value={value.percentage}/>
    </CellStyles>
}