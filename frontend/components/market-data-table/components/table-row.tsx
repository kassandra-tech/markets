import { Row } from "../styled/row";
import {useState} from "react";
import {FlexRow} from "../../styled-wrappers";
import {v4 as uuidV4} from "uuid";
import {Cell} from "../styled/cell";
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
        <Row role="button" onClick={rowClick}>
            <FlexRow>
                {columns.map((item: Column) => <Cell
                    key={uuidV4()}
                    width={item.width}
                >
                    {item.dataField !== 'indicator' && data[item.dataField]}
                    {item.dataField === 'indicator' && <Indicator value={data[item.dataField]}/>}
                </Cell>)}
            </FlexRow>
            {expanded && <div style={styles}>
                <h1>Expandable</h1>
            </div>}
        </Row>

    )
}