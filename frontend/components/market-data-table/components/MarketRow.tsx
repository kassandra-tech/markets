import {MarketDataModel} from "../../../models/MarketDataModel";
import {Column} from "../market-data-table";
import { RowStyles } from "../styled/row.styles";
import useToggle from "../../../hooks/useToggle";
import styled from "styled-components";
import MarketRowLine from "./MarketRowLine";
import React from "react";

const RowWithHover = styled(RowStyles)`
  &:hover {
    box-shadow: -5.5px -5.5px 10.5px #3B4451, 3.5px 3.5px 18.5px #000000;
  }
`;

export interface MarketRowProps {
    data?: any;
    expandable?: boolean;
    columns?: Column[];
    expandableComponent?: any;
    expandRow?: () => void;
    isExpanded?: boolean;
}

export default function MarketRow({
    data = [],
    expandable = false,
    expandableComponent = `<div/>`,
    isExpanded = false,
    expandRow = () => {},
}: MarketRowProps) {

    const rootItemData: MarketDataModel = data.data[0];
    const expandableData: MarketDataModel[] = data.data.slice(1);

    return (
        <RowWithHover role="button" onClick={() => expandable ? expandRow() : null}>
            {rootItemData && <MarketRowLine data={rootItemData}/>}
            {isExpanded && React.cloneElement(expandableComponent, { data: expandableData})}
        </RowWithHover>

    )
}