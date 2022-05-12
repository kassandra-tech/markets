import TableHeader from "./table-header";
import FiltersTitle from "../styled/filters-title";
import styled from "styled-components";
import {FlexColumn, FlexColumnCentered} from "../../styled-wrappers";
import FilterButton from "../styled/filter-button";

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
                <FiltersTitle />
                <StyledFilters>
                    <FilterButton click={selectAll}>All markets</FilterButton>
                    <FilterButton click={selectFavorites}>Favorites</FilterButton>
                    <FilterButton click={() => selectFilter('BTC')}>BTC</FilterButton>
                    <FilterButton click={() => selectFilter('USD')}>USD</FilterButton>
                    <FilterButton click={() => selectFilter('USDT')}>USDT</FilterButton>
                    <FilterButton click={() => selectFilter('ETH')}>ETH</FilterButton>
                    <FilterButton click={() => selectFilter('BNB')}>BNB</FilterButton>
                </StyledFilters>
            </StyledFilterBody>

        </StyledFiltersContainer>
    )
}