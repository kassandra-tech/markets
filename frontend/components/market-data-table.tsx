import styled from 'styled-components';
import DataTable, { createTheme } from 'react-data-table-component';
import {FlexColumn, FlexColumnCentered, FlexRowCentered} from "./styled-wrappers";

const columns = [
    {
        name: 'Market',
        selector: (row: { market: any; }) => row.market,
        sortable: true,
    },
    {
        name: 'Rank',
        selector: (row: { rank: any; }) => row.rank,
        sortable: true,
    },
    {
        name: 'Rating',
        selector: (row: { rating: any; }) => row.rating,
        sortable: true,
    },
    {
        name: 'Price',
        selector: (row: { price: any; }) => row.price,
        sortable: true,
    },
    {
        name: 'Range',
        selector: (row: { range: any; }) => row.range,
        sortable: true,
    },
    {
        name: 'Indicator',
        selector: (row: { indicator: any; }) => row.indicator,
        sortable: true,
    },
    {
        name: 'Volume',
        selector: (row: { volume: any; }) => row.volume,
        sortable: true,
    },
    {
        name: 'Exchanges',
        selector: (row: { exchanges: any; }) => row.exchanges,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        market: 'Bitcoin',
        rank: 1,
        rating: 'AAA',
        price: 39624.49,
        range: 39624.49,
        indicator: '10%',
        volume: 23669395398.55,
        exchanges: ''
    },
    {
        id: 2,
        market: 'Ethereum',
        rank: 2,
        rating: 'BBB',
        price: 2889.43,
        range: 2905.45,
        indicator: '10%',
        volume: 17088996369.48,
        exchanges: ''
    }
]

createTheme('kassandra-dark', {
    text: {
        //primary: '',
        //secondary: '#2aa198',
    },
    background: {
        default: '#202226',
    },
    context: {
        //background: '#cb4b16',
        //text: '#FFFFFF',
    },
    divider: {
        //default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');


const StyledContainer = styled.main`
      display: flex;
      border-radius: 10px;
      width: 1410px;
      height: 755px;
      margin-left: 15px;
      margin-top: 95px;
      overflow: hidden;
      background: #202226;
`;

const StyledFiltersContainer = styled.div`
    width: 225px;
`;

const StyledHeader = styled.div`
    height: 40px;
    background: linear-gradient(180deg, #2C3035 0%, #1D1F23 100%);
    box-shadow: 5.09045e-15px 83.1333px 166.267px rgba(7, 8, 9, 0.3765), inset -2.02487e-15px -33.0686px 33.0686px #1A1C20, inset 2.02487e-15px 33.0686px 33.0686px #2E3238;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
`;

const StyledFilterBody = styled(FlexColumn)`
  padding: 20px 20px 0 15px;
  `;

const StyledFilters = styled(FlexColumnCentered)`
  margin-top: 30px;
  width: 190px;
  height: 308px;
  border: 0.5px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.7), inset -2px -2px 2px #484B4E;
  background: #25282D;
  border-radius: 10px;
  padding: 19px 15px;
  `;

const StyledFiltersTitle = styled(FlexRowCentered)`
  position: absolute;
  z-index: 1;
  width: 82px;
  height: 38px;
  background: #25282D;
  margin-left: 12px;
  //background: #202226;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.7);
  border-radius: 10px 10px 0 0;
  //box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.7);
  //border-radius: 10px 10px 0 0;
  //border-bottom: 0;
  // color: #C4C4C4;
`;

const StyledFilterButton = styled.button`
  width: 160px;
  height: 30px;
  background: #2C2F33;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;

const StyledDataTableContainer = styled(FlexColumn)`
    width: 1185px;
`;

export default function MarketDataTable() {

    const ExpandedComponent = ({ data }: {data: any}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    return <StyledContainer>
        <StyledFiltersContainer>
            <StyledHeader>
                <span>Time ID</span>
            </StyledHeader>
            <StyledFilterBody>

                <StyledFiltersTitle>
                    <span>Markets</span>
                </StyledFiltersTitle>
                <StyledFilters>
                    <StyledFilterButton>All markets</StyledFilterButton>
                    <StyledFilterButton>Favorites</StyledFilterButton>
                    <StyledFilterButton>BTC</StyledFilterButton>
                    <StyledFilterButton>USD</StyledFilterButton>
                    <StyledFilterButton>USDT</StyledFilterButton>
                    <StyledFilterButton>ETH</StyledFilterButton>
                    <StyledFilterButton>BNB</StyledFilterButton>
                </StyledFilters>
            </StyledFilterBody>

        </StyledFiltersContainer>
        <StyledDataTableContainer>
            <DataTable
                theme="kassandra-dark"
                columns={columns}
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked
                data={data}
                expandableRows
                pagination
                expandableRowsHideExpander
            />
        </StyledDataTableContainer>
        </StyledContainer>
};