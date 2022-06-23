import {MarketDataModel} from "../../../models/MarketDataModel";
import MarketCell from "./cells/market-cell";
import MainMarketCell from "./cells/main-market-cell";
import IndicatorCell from "./cells/indicator-cell";
import {VolumeCell} from "./cells/volume-cell";
import ExchangesCell from "./cells/exchanges-cell";
import {FlexRow} from "../../styled-wrappers";

export default function MarketRowLine({data}: {data: MarketDataModel}) {

    const marketCellValue = {
        currency: data.currency,
        quoteCurrency: data.quoteCurrency,
        currencyName: data.currencyName || data.market,
    }
    const priceCellValue = [data.price.toFixed(3).toString(), data.quotePrice.toFixed(3).toString()];
    const rangeCellValue = [data.highPrice.toFixed(3).toString(), data.lowPrice.toFixed(3).toString()];
    const indicatorCellValue = {
        percentage: data.percentage,
        label: data.label
    }
    
    return <FlexRow>
        <MarketCell value={marketCellValue} width={200} />
        <MainMarketCell value={data.rank} dataField="rank" width={110}/>
        <MainMarketCell value={data.rating} dataField="rating" width={110}/>
        <MainMarketCell value={priceCellValue} dataField="price" width={110}/>
        <MainMarketCell value={rangeCellValue} dataField="range" width={110}/>
        <IndicatorCell value={indicatorCellValue} width={110} />
        <VolumeCell value={data.volume.toFixed(4)} width={200}/>
        <ExchangesCell value={data.exchanges} width={180}/>
    </FlexRow>
}