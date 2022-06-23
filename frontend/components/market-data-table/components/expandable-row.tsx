import styled from "styled-components";
import {RowStyles} from "../styled/row.styles";
import {v4 as uuidV4} from 'uuid';
import {MarketDataModel} from "../../../models/MarketDataModel";
import MarketRowLine from "./MarketRowLine";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useState } from "react";
import {FlexRowCentered} from "../../styled-wrappers";

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;

const ExpandedFooter = styled(FlexRowCentered)`
    padding: 10px 0;
`;

const SLICE_STEP = 15;

export interface ExpandableRowProps {
    showAll?: () => void;
    data?: MarketDataModel[];
}

export default function ExpandableRow({data = [], showAll = () => {}}: ExpandableRowProps) {

    //console.log('expandable props: ', data);

    const [index, setIndex] = useState<number>(SLICE_STEP);

    const [items, setItems] = useState<MarketDataModel[]>(data.slice(0, SLICE_STEP));

    const [hasMore, setHasMore] = useState<boolean>(true);

    console.log('expanded data length', data.length);

    const fetchMoreData = () => {
        if (items.length >= data.length) {
            setHasMore(false);
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            const newIndex = index + SLICE_STEP;
            setItems(items.concat(data.slice(index, newIndex)));
            setIndex(newIndex);
        }, 0);
    };

    const showAllItems = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        showAll();
    }

    return <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={310}
        endMessage={
            <ExpandedFooter>
                <Button onClick={showAllItems}>Show all</Button>
            </ExpandedFooter>
        }
    >
        {items.map((item: MarketDataModel) => <RowStyles key={uuidV4()}>
            <MarketRowLine data={item}/>
        </RowStyles>)}
    </InfiniteScroll>
}