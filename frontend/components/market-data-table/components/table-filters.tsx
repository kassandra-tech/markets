import TableHeader from "./table-header";
import FiltersTitleStyles from "../styled/filters-title.styles";
import styled from "styled-components";
import {FlexColumn, FlexColumnCentered} from "../../styled-wrappers";
import FilterButtonStyles from "../styled/filter-button.styles";

const StyledFiltersContainer = styled.div`
    width: 225px;
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


export interface TableFiltersParams {
    filtersChange: Function;
}

export default function TableFilters({filtersChange}: TableFiltersParams) {

    const selectAll = () => {
        console.log('select all markets');
        filtersChange('all');
    }

    const selectFavorites = () => {
        console.log('select favorites');
        filtersChange('favorites');
    }

    const selectFilter = (param: string) => {
        console.log('select filter:', param);
        filtersChange(param);
    }

    return (
        <StyledFiltersContainer>
            <TableHeader>Time ID</TableHeader>
            <StyledFilterBody>
                <FiltersTitleStyles />
                <StyledFilters>
                    <FilterButtonStyles click={selectAll}>All markets</FilterButtonStyles>
                    <FilterButtonStyles click={selectFavorites}>Favorites</FilterButtonStyles>
                    <FilterButtonStyles click={() => selectFilter('BTC')}>BTC</FilterButtonStyles>
                    <FilterButtonStyles click={() => selectFilter('USD')}>USD</FilterButtonStyles>
                    <FilterButtonStyles click={() => selectFilter('USDT')}>USDT</FilterButtonStyles>
                    <FilterButtonStyles click={() => selectFilter('ETH')}>ETH</FilterButtonStyles>
                    <FilterButtonStyles click={() => selectFilter('BNB')}>BNB</FilterButtonStyles>
                </StyledFilters>
            </StyledFilterBody>

        </StyledFiltersContainer>
    )
}