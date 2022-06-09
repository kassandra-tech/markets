import {CellStyles} from "../../styled/cell.styles";
import Image from 'next/image';
import styled from "styled-components";
import {v4 as uuidV4} from "uuid";
import {getMarketIconByName} from "../../../../services/image-helper.service";

const SpanStyles = styled.span`
    font-size: 16px;
    color: ${props => props.theme.colors.secondaryWhite};
`;

export interface ExchangesCellProps {
    value: string[];
    width: number
}

export default function ExchangesCell({width, value}: ExchangesCellProps) {

    const visible = value.slice(0, 4);
    const rest = value.slice(4);

    return <CellStyles width={width} justify="space-around">
        {visible.map(name => <Image src={getMarketIconByName(name)} alt={name} title={name} key={uuidV4()}/>)}
        {rest.length > 0 && <SpanStyles>+{rest.length}</SpanStyles>}
    </CellStyles>
}