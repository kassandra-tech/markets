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
        //filterField,
        filters,
        filtersChange,
        loadFavorites,
        getSortingFieldValue = (item, field) => item[field]
    }: MarketDataTableProps
) {

    const [internalData, setInternalData] = useState<any[]>(data);
    const [visibleData, setVisibleData] = useState<any[]>(data);

    const [sortingState, setSortingState] = useState<any>({
        order: SortingStates.none,
        field: ''
    })

    useEffect(() => {
        console.log('new data', data);
        setInternalData(data);
        setVisibleData(data);
    }, [data]);

    /*const filtersChange = (value: any) => {
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
    }*/

    const sortChange = (order: SortingStates, field: string) => {
        setSortingState({
            order,
            field
        })
    }

    useEffect(() => {
        const {field, order} = sortingState;
        let sortedData = [];
        console.log(field, order, internalData);
        /*if(isArray(internalData[0][field])) {
            sortedData = orderBy(internalData, (item) => getSortingFieldValue(item, field), [order]);
        } else if(isObject(internalData[0][field])) {
            // todo rethink sorting of object fields
            sortedData = orderBy(internalData, (item) => getSortingFieldValue(item, field), [order]);
        } else {
            sortedData = orderBy(internalData, [field], [order]);
        }*/
        sortedData = orderBy(internalData, (item) => getSortingFieldValue(item, field), [order]);
        setVisibleData(sortedData);
    }, [sortingState]);
    console.log('visible data: ', visibleData);
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
                {visibleData.length > 0 && visibleData.map((item: any) => rowComponent ?
                    /*rowComponent({
                        data: item,
                        columns: columns,
                        expandable: expandable,
                        expandableComponent: expandableComponent,
                    })*/
                    React.cloneElement(rowComponent, {
                        data: item,
                        columns: columns,
                        expandable: expandable,
                        expandableComponent: expandableComponent,
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