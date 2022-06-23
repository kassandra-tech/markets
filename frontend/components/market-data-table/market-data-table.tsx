import styled from 'styled-components';
import {FlexColumn} from "../styled-wrappers";
import TableFilters, {baseFilterValues, TableFilter} from "./components/table-filters";
import TableHeader from "./components/table-header";
import {v4 as uuidV4} from 'uuid';
import React, {ReactNode, useEffect, useState} from "react";
import {Currencies, SortingStates} from "../../services/constants";
import TableRow from "./components/table-row";
import {orderBy, isArray, isObject, forOwn} from 'lodash';
import {NoDataStyles} from "./styled/no-data.styles";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

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
      padding-left: 15px;
    }
    .table-body {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 715px;
      padding: 15px 25px 15px 15px;
      overflow-y: scroll;
    }
`;

export interface Column {
    name: string;
    sortable?: boolean;
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
    rowComponent?: any;
    filterField?: string; // todo remove if filtering will be only on server side
    filters: TableFilter[];
    filtersChange: (value: any) => {};
    loadFavorites: (value: any) => {};
    getSortingFieldValue?: (item: any, field: string) => {};
}

export default function MarketDataTable(
    {
        columns = [],
        data = [],
        expandable = false,
        expandableComponent = <div/>,
        rowComponent = null,
        filters,
        filtersChange,
        loadFavorites,
        getSortingFieldValue = (item, field) => item[field]
    }: MarketDataTableProps
) {

    const [internalData, setInternalData] = useState<any[]>(data);
    const [visibleData, setVisibleData] = useState<any[]>(data);
    const [expandedRowIndex, setExpandedRowIndex] = useState<number>(-1);

    const [sortingState, setSortingState] = useState<any>({
        order: SortingStates.none,
        field: ''
    })

    useEffect(() => {
        setInternalData(data);
        setVisibleData(data);
    }, [data]);

    useEffect(() => {
        const {field, order} = sortingState;
        let sortedData = [];
        sortedData = orderBy(internalData, (item) => getSortingFieldValue(item, field), [order]);
        setVisibleData(sortedData);
    }, [sortingState]);

    const sortChange = (order: SortingStates, field: string) => {
        setSortingState({
            order,
            field
        })
    }

    const expandRow = (index: number) => {
        console.log('toggleRow: ', index);
        if (expandedRowIndex === index) {
            setExpandedRowIndex(-1);
        } else {
            setExpandedRowIndex(index);
        }
    }

    return <Container>
        <TableFilters
            filtersChange={filtersChange}
            loadFavorites={loadFavorites}
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
                {visibleData.length > 0 && visibleData.map((item: any, index: number) => rowComponent ?
                    React.cloneElement(rowComponent, {
                        data: item,
                        columns: columns,
                        expandable: expandable,
                        expandableComponent: expandableComponent,
                        expandRow: () => expandRow(index),
                        isExpanded: expandedRowIndex === index,
                        key: uuidV4()
                    }) : <TableRow
                    data={item}
                    columns={columns}
                    key={uuidV4()}
                    expandable={expandable}
                    expandableComponent={expandableComponent}
                />)}
                {visibleData.length === 0 && <NoDataStyles>No data available</NoDataStyles>}
            </div>

        </StyledDataTableContainer>
        </Container>
};