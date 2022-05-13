import styled from "styled-components";

interface CellProps {
    width?: number;
    justify?: string;
    direction?: string;
    alignItems?: string;
}

export const CellStyles = styled.div<CellProps>`
  display: flex;
  flex-direction: ${({direction}: CellProps) => direction ? direction : 'row'};
  justify-content: ${({justify}: CellProps) => justify ? justify : 'center'};
  align-items: ${({alignItems}: CellProps) => alignItems ? alignItems : 'center'};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  min-width: 110px;
  padding: 0  10px;
  height: 50px;
  width: ${({width}: CellProps) => width ? width + 'px' : 'auto'};
  span {
    display: inline-flex;
    align-items: center;
  }
  .grey-span {
    color: ${props => props.theme.colors.grey}
  }
  .centered-text {
    text-align: center;
  }
  .margin-top {
    margin-top: 4px;
  }
`;