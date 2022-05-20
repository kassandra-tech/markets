import styled from "styled-components";
import {CellStyles} from "../styled/cell.styles";
import MainMarketCell from "./cells/main-market-cell";
import IndicatorCell from "./cells/indicator-cell";
import {VolumeCell} from "./cells/volume-cell";
import MarketplaceCell from "./cells/marketplace-cell";
import {Markets} from "../../../services/constants";
import {RowStyles} from "../styled/row.styles";
import {v4 as uuidV4} from 'uuid';
import {FlexRow} from "../../styled-wrappers";

const rowsData = [
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 25,
        volume: 23669395398.55,
        market: Markets.Binance
    },
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 35,
        volume: 23669395398.55,
        market: Markets["Crypto.com"]
    },
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 45,
        volume: 23669395398.55,
        market: Markets.FTX
    },
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 55,
        volume: 23669395398.55,
        market: Markets.Exodus
    },
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 65,
        volume: 23669395398.55,
        market: Markets["Huobi Global"]
    },
    {
        price: [39624.49, 39623.13],
        range: [39624.49, 37620.12],
        indicator: 75,
        volume: 23669395398.55,
        market: Markets.Coinbase
    }
]

const Styles = styled.div`
    height: 310px;
    width: 100%;
    overflow-y: scroll;
`;

export default function ExpandableRow(data: any) {
    console.log('expandable props: ', data);
    return <Styles>
        {rowsData.map((item: any) => <RowStyles key={uuidV4()}>
            <FlexRow>
                <CellStyles width={200}/>
                <CellStyles/>
                <CellStyles/>
                <MainMarketCell
                    dataField="price"
                    value={item.price}
                    width={110}
                />
                <MainMarketCell
                    dataField="range"
                    value={item.range}
                    width={110}
                />
                <IndicatorCell
                    value={item.indicator}
                    width={110}
                />
                <VolumeCell width={200} value={item.volume}/>
                <MarketplaceCell width={210} value={item.market}/>
            </FlexRow>
        </RowStyles>)}
    </Styles>
}