import TableHeader from "./table-header";
import FiltersTitleStyles from "../styled/filters-title.styles";
import styled from "styled-components";
import {FlexColumn, FlexColumnCentered} from "../../styled-wrappers";
import FilterButtonStyles from "../styled/filter-button.styles";
import {useState} from "react";
import {v4 as uuidV4} from "uuid";

const StyledFiltersContainer = styled.div`
  width: 225px;
`;

const StyledFilterBody = styled(FlexColumn)`
  padding: 20px 0 0 25px;
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
    loadFavorites: Function;
    data: TableFilter[];
}

export interface TableFilter {
    name: string;
    value: any
}

export enum baseFilterValues {
    all = 1,
    favorites = 0,
}


export default function TableFilters({filtersChange, loadFavorites, data = []}: TableFiltersParams) {

    const [selectedFilter, setSelectedFilter] = useState<number>(0);

    const selectFilter = (filterValue: number) => {
        setSelectedFilter(filterValue);
        if(filterValue === baseFilterValues.favorites) {
            loadFavorites();
        } else {
            filtersChange(filterValue);
        }
    }

    return (
        <StyledFiltersContainer>
            {/*<TableHeader>Time ID</TableHeader>*/}
            <StyledFilterBody>
                <FiltersTitleStyles />
                <StyledFilters>
                    <FilterButtonStyles
                        click={() => selectFilter(baseFilterValues.all)}
                        selected={selectedFilter === baseFilterValues.all}
                    >All markets</FilterButtonStyles>
                    <FilterButtonStyles
                        click={() => selectFilter(baseFilterValues.favorites)}
                        selected={selectedFilter === baseFilterValues.favorites}
                    >Favorites</FilterButtonStyles>
                    {data.map((item: TableFilter) => <FilterButtonStyles
                        click={() => selectFilter(item.value)}
                        selected={selectedFilter === item.value}
                        key={uuidV4()}
                    >{item.name}</FilterButtonStyles>)}
                </StyledFilters>
            </StyledFilterBody>

        </StyledFiltersContainer>
    )
}