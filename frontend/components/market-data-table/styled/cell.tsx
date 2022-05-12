import styled from "styled-components";

interface CellProps {
    width?: number;
}

export const Cell = styled.div<CellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  min-width: 110px;
  padding: 0  10px;
  height: 50px;
  width: ${({width}: CellProps) => width ? width + 'px' : 'auto'};
`;