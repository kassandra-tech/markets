import styled from 'styled-components';
import {FlexColumn} from "../styled-wrappers";
import TableFilters from "./components/table-filters";
import TableHeader from "./components/table-header";
import {v4 as uuidV4} from 'uuid';
import {useState} from "react";
import {SortingStates} from "../../services/constants";
import TableRow from "./components/table-row";

const Container = styled.main`
      display: flex;
      border-radius: 10px;
      width: 1410px;
      height: 755px;
      margin-left: 15px;
      margin-top: 95px;
      overflow: hidden;
      background: #202226;
`;

const StyledDataTableContainer = styled(FlexColumn)`
    width: 1185px;
    .table-header {
      width: 1185px;
      display: flex;
    }
    .table-body {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 715px;
      padding: 15px 25px 15px 0;
      overflow-y: scroll;
    }
`;

export interface Column {
    name: string;
    sortable: boolean;
    width?: number;
    dataField: string;
}

export interface MarketDataTableProps {
    columns: Column[],
    data: any[]
}

export default function MarketDataTable(
    {
        columns = [],
        data = []
    }: MarketDataTableProps
) {

    // const ExpandedComponent = ({ data }: {data: any}) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const [sortingState, setSortingState] = useState<any>({
        sort: SortingStates.none,
        field: ''
    })

    const filtersChange = (params: any) => {
         console.log('filter change', params);
    }

    const sortChange = (sort: SortingStates, field: string) => {
        console.log('sortChange: ', sort, field);
        setSortingState({
            sort,
            field
        })
    }

    console.log(sortingState);

    return <Container>
        <TableFilters filtersChange={filtersChange}/>
        <StyledDataTableContainer>
            <div className="table-header">
                {columns && columns.map((item: Column) => <TableHeader
                        sortable={item.sortable}
                        onSort={(sort: SortingStates) => sortChange(sort, item.dataField)}
                        key={uuidV4()}
                        width={item.width}
                        selected={item.dataField === sortingState.field}
                        sortSelected={item.dataField === sortingState.field ? sortingState.sort : SortingStates.none}
                    >{item.name}</TableHeader>)
                }
                
            </div>
            <div className="table-body">
                {data.length && data.map((item: any) => <TableRow
                    data={item}
                    columns={columns}
                    key={uuidV4()}
                    expandable={true}
                />)}
            </div>

        </StyledDataTableContainer>
        </Container>
};