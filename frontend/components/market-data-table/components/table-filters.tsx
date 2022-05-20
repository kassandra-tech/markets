import TableHeader from "./table-header";
import FiltersTitleStyles from "../styled/filters-title.styles";
import styled from "styled-components";
import {FlexColumn, FlexColumnCentered} from "../../styled-wrappers";
import FilterButtonStyles from "../styled/filter-button.styles";
import {useState} from "react";

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

    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    const selectAll = () => {
        console.log('select all markets');
        setSelectedFilter('all');
        filtersChange('all');
    }

    const selectFavorites = () => {
        console.log('select favorites');
        setSelectedFilter('favorites');
        filtersChange('favorites');
    }

    const selectFilter = (param: string) => {
        console.log('select filter:', param);
        setSelectedFilter(param);
        filtersChange(param);
    }

    return (
        <StyledFiltersContainer>
            <TableHeader>Time ID</TableHeader>
            <StyledFilterBody>
                <FiltersTitleStyles />
                <StyledFilters>
                    <FilterButtonStyles
                        click={selectAll}
                        selected={selectedFilter === 'all'}
                    >All markets</FilterButtonStyles>
                    <FilterButtonStyles
                        click={selectFavorites}
                        selected={selectedFilter === 'favorites'}
                    >Favorites</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter('BTC')}
                        selected={selectedFilter === 'BTC'}
                    >BTC</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter('USD')}
                        selected={selectedFilter === 'USD'}
                    >USD</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter('USDT')}
                        selected={selectedFilter === 'USDT'}
                    >USDT</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter('ETH')}
                        selected={selectedFilter === 'ETH'}
                    >ETH</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter('BNB')}
                        selected={selectedFilter === 'BNB'}
                    >BNB</FilterButtonStyles>
                </StyledFilters>
            </StyledFilterBody>

        </StyledFiltersContainer>
    )
}