import { RowStyles } from "../styled/row.styles";
import {useState} from "react";
import {FlexRow} from "../../styled-wrappers";
import {v4 as uuidV4} from "uuid";
import {CellStyles} from "../styled/cell.styles";
import {Column} from "../market-data-table";

export interface TableRowProps {
    data: any;
    expandable?: boolean;
    columns: Column[];
    expandableComponent: any
}

export default function TableRow(
    {
        data,
        expandable = false,
        columns = [],
        expandableComponent
    }: TableRowProps
) {

    const [expanded, setExpanded] = useState<boolean>(false);

    const rowClick = () => {
        if(expandable) {
            setExpanded(!expanded);
        }
    }

    return (
        <RowStyles role="button" onClick={rowClick}>
            <FlexRow>
                {columns.map((item: Column) => item.cell ?
                    <item.cell
                        value={data[item.dataField]}
                        dataField={item.dataField}
                        width={item.width}
                        key={uuidV4()}
                    /> : <CellStyles
                    key={uuidV4()}
                    width={item.width}
                >
                    {data[item.dataField]}
                </CellStyles>)}
            </FlexRow>
            {expanded && expandableComponent(data)}
        </RowStyles>

    )
}