import styled from 'styled-components';
import {FlexColumn} from "../styled-wrappers";
import TableFilters, {baseFilterValues, TableFilter} from "./components/table-filters";
import TableHeader from "./components/table-header";
import {v4 as uuidV4} from 'uuid';
import {useEffect, useState} from "react";
import {Currencies, SortingStates} from "../../services/constants";
import TableRow from "./components/table-row";
import {orderBy, isArray, isObject, forOwn} from 'lodash';

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
    withInfo?: boolean;
    cell?: any;
}

export interface MarketDataTableProps {
    columns: Column[];
    data: any[];
    expandable: boolean;
    expandableComponent: any;
    filterField: string;
    filters: TableFilter[];
}

export default function MarketDataTable(
    {
        columns = [],
        data = [],
        expandable = false,
        expandableComponent = <div/>,
        filterField,
        filters
    }: MarketDataTableProps
) {

    const [internalData, setInternalData] = useState<any[]>(data);
    const [visibleData, setVisibleData] = useState<any[]>(data);

    const [sortingState, setSortingState] = useState<any>({
        order: SortingStates.none,
        field: ''
    })

    const filtersChange = (value: any) => {
        if(value === baseFilterValues.all) {
            return setVisibleData(internalData);
        }

        if(value === baseFilterValues.favorites) {
            //todo add favorites filtering
            return setVisibleData(internalData);
        }

        const filteredData = data.filter((item: any) => {
            const dataItemValue = item[filterField];
            if(isObject(dataItemValue)) {
                const values = Object.values(dataItemValue);
                return !!values.filter(val => val === value).length;
            }
            if(isArray(dataItemValue)) {
                return !!dataItemValue.filter(val => val === value).length;
            }
            return dataItemValue === value;
        });

        setVisibleData(filteredData);
    }

    const sortChange = (order: SortingStates, field: string) => {
        setSortingState({
            order,
            field
        })
    }

    useEffect(() => {
        const {field, order} = sortingState;
        let sortedData = [];
        if(isArray(internalData[0][field])) {
            sortedData = orderBy(internalData, (item) => item[field][0], [order]);
        } else if(isObject(internalData[0][field])) {
            // todo rethink sorting of object fields
            sortedData = orderBy(internalData, (item) => item[field].name, [order]);
        } else {
            sortedData = orderBy(internalData, [field], [order]);
        }
        setVisibleData(sortedData);
    }, [sortingState]);


    return <Container>
        <TableFilters
            filtersChange={filtersChange}
            data={filters}
        />
        <StyledDataTableContainer>
            <div className="table-header">
                {columns && columns.map((item: Column) => <TableHeader
                        sortable={item.sortable}
                        onSort={(order: SortingStates) => sortChange(order, item.dataField)}
                        key={uuidV4()}
                        width={item.width}
                        selected={item.dataField === sortingState.field}
                        sortSelected={item.dataField === sortingState.field ? sortingState.order : SortingStates.none}
                        withInfo={item.withInfo}
                    >{item.name}</TableHeader>)
                }
            </div>
            <div className="table-body">
                {visibleData.length > 0 && visibleData.map((item: any) => <TableRow
                    data={item}
                    columns={columns}
                    key={uuidV4()}
                    expandable={expandable}
                    expandableComponent={expandableComponent}
                />)}
                {visibleData.length === 0 && <h1>No data for current filter</h1>}
            </div>

        </StyledDataTableContainer>
        </Container>
};