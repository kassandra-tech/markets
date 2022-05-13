import {ThemeContext} from "styled-components";
import React, {useContext} from "react";
import {HeaderStyles} from "../styled/header.styles";
import {SortingStates} from "../../../services/constants";

export interface TableHeader {
    children: React.ReactNode;
    width?: number;
    sortable?: boolean;
    onSort?: Function;
    selected?: boolean;
    sortSelected?: SortingStates;
    withInfo?: boolean;
}

export default function TableHeader(
    {
        children,
        width,
        sortable = false,
        onSort = () => {},
        selected = false,
        sortSelected = SortingStates.none,
        withInfo = false
    }: TableHeader
) {

    //const [sortingState, setSortingState] = useState<SortingStates>(sortSelected);
    const {colors} = useContext(ThemeContext)

    const sort = () => {

        if(sortSelected === SortingStates.none) {
            //setSortingState(SortingStates.asc);
            onSort(SortingStates.asc);
        }

        if(sortSelected === SortingStates.asc) {
            //setSortingState(SortingStates.desc);
            onSort(SortingStates.desc);
        }
        if(sortSelected === SortingStates.desc) {
            //setSortingState(SortingStates.none);
            onSort(SortingStates.asc);
        }
    }


    return <HeaderStyles width={width} role="button" onClick={sort} selected={selected}>
        <span>
            {children}
        </span>

        {withInfo && <div className="info">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="6" r="4.625" stroke="white" strokeOpacity="0.6" strokeWidth="0.75"/>
                <path d="M7 5.70703V8.6237" stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 3.38148L7.00583 3.375" stroke="white" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        }

        {sortable && <div className="sorting">
            <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.25382 4H0.746175C0.607696 4.00022 0.471992 3.9582 0.35477 3.87882C0.237548 3.79943 0.143601 3.68592 0.0838036 3.55143C0.0138036 3.39186 -0.0131574 3.21432 0.00599255 3.03905C0.0251425 2.86378 0.0896334 2.69783 0.192116 2.5601L1.94594 0.272417C2.01477 0.186907 2.09986 0.118328 2.19546 0.0713264C2.29105 0.024325 2.39491 0 2.5 0C2.60509 0 2.70895 0.024325 2.80454 0.0713264C2.90014 0.118328 2.98523 0.186907 3.05406 0.272417L4.80788 2.5601C4.91037 2.69783 4.97486 2.86378 4.99401 3.03905C5.01316 3.21432 4.9862 3.39186 4.9162 3.55143C4.8564 3.68592 4.76245 3.79943 4.64523 3.87882C4.52801 3.9582 4.3923 4.00022 4.25382 4Z"
                      fill={sortSelected === SortingStates.asc ? colors.cryptoGreen : 'white'}
                      fillOpacity="0.6"
                />
            </svg>
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.746175 0.500001L4.25383 0.500001C4.3923 0.499785 4.52801 0.5418 4.64523 0.621185C4.76245 0.700569 4.8564 0.814075 4.9162 0.948566C4.9862 1.10814 5.01316 1.28568 4.99401 1.46095C4.97486 1.63622 4.91037 1.80217 4.80788 1.9399L3.05406 4.22758C2.98523 4.31309 2.90014 4.38167 2.80454 4.42867C2.70895 4.47568 2.60509 4.5 2.5 4.5C2.39491 4.5 2.29105 4.47568 2.19546 4.42867C2.09986 4.38167 2.01477 4.31309 1.94594 4.22758L0.192115 1.9399C0.089633 1.80217 0.0251422 1.63622 0.00599194 1.46095C-0.0131578 1.28568 0.013804 1.10814 0.0838041 0.948566C0.143601 0.814075 0.237548 0.700569 0.35477 0.621185C0.471992 0.5418 0.607697 0.499785 0.746175 0.500001Z"
                      fill={sortSelected === SortingStates.desc ? colors.cryptoGreen : 'white'}
                      fillOpacity="0.6"
                />
            </svg>
        </div>}
    </HeaderStyles>
}