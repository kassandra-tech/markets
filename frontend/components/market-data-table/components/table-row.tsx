import { RowStyles } from "../styled/row.styles";
import {useState} from "react";
import {FlexRow} from "../../styled-wrappers";
import {v4 as uuidV4} from "uuid";
import {CellStyles} from "../styled/cell.styles";
import {Column} from "../market-data-table";
import Indicator from "./indicator";

export interface TableRowProps {
    data: any;
    expandable?: boolean;
    columns: Column[];
}

export default function TableRow(
    {
        data,
        expandable = false,
        columns = []
    }: TableRowProps
) {

    const [expanded, setExpanded] = useState<boolean>(false);

    const styles = {
        height: '310px',
        width: '100%'
    }

    const rowClick = () => {
        if(expandable) {
            setExpanded(!expanded);
        }
    }

    return (
        <RowStyles role="button" onClick={rowClick}>
            <FlexRow>
                {columns.map((item: Column) => item.cell ? item.cell({
                    width: item.width,
                    value: data[item.dataField],
                    dataField: item.dataField
                }) : <CellStyles
                    key={uuidV4()}
                    width={item.width}
                >
                    {data[item.dataField]}
                </CellStyles>)}
            </FlexRow>
            {expanded && <div style={styles}>
                <h1>Expandable</h1>
            </div>}
        </RowStyles>

    )
}