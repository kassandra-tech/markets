import styled from "styled-components";

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FlexRow = styled.div`
    display: flex;
`

export const FlexColumnCentered = styled(FlexColumn)`
    align-items: center;
`;

export const FlexRowCentered = styled(FlexRow)`
    justify-content: center;
    align-items: center;
`;