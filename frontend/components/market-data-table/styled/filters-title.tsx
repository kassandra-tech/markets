import styled from "styled-components";
import {FlexRowCentered} from "../../styled-wrappers";

const StyledFiltersTitle = styled(FlexRowCentered)`
  position: absolute;
  z-index: 1;
  width: 82px;
  height: 38px;
  background: #25282D;
  margin-left: 12px;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.7);
  border-radius: 10px 10px 0 0;
`;

export default function FiltersTitle() {
    return (<StyledFiltersTitle>
        <span>Markets</span>
    </StyledFiltersTitle>)
}