import styled from "styled-components";
import {RowStyles} from "../styled/row.styles";
import {v4 as uuidV4} from 'uuid';
import {MarketDataModel} from "../../../models/MarketDataModel";
import MarketRowLine from "./MarketRowLine";
import InfiniteScroll from "react-infinite-scroll-component";
import {useState} from "react";

const Styles = styled.div`
    height: 310px;
    width: 100%;
    overflow-y: scroll;
`;

const SLICE_STEP = 50;

export default function ExpandableRow({data = []}: {data?: MarketDataModel[]}) {
    //console.log('expandable props: ', data);

    const [index, setIndex] = useState<number>(SLICE_STEP);

    const [items, setItems] = useState<MarketDataModel[]>(data.slice(0, SLICE_STEP));

    const [hasMore, setHasMore] = useState<boolean>(true);

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
    /*return <Styles>
       {/!* {data.map((item: MarketDataModel) => <RowStyles key={uuidV4()}>
            <MarketRowLine data={item}/>
        </RowStyles>)}*!/}
    </Styles>*/
    return <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={310}
        endMessage={
            <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
            </p>
        }
    >
        {items.map((item: MarketDataModel) => <RowStyles key={uuidV4()}>
            <MarketRowLine data={item}/>
        </RowStyles>)}
    </InfiniteScroll>
}