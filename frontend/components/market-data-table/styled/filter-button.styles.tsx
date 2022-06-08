import styled from "styled-components";
import {ReactNode} from "react";

interface StyledProps {
    selected: boolean
}

const StyledFilterButton = styled.button<StyledProps>`
  width: 160px;
  height: 30px;
  background: #2C2F33;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: ${(props) => props.selected ? props.theme.colors.cryptoGreen : props.theme.colors.grey};
  margin-top: 10px;
  outline: none;
  border: 0;
  box-shadow: ${({selected}: StyledProps) => selected ? 'inset -5.22px -5.22px 5.22px #3B4451, inset 3.73381px 3.73381px 6.22302px #000000;' : '' };
  &:hover {
    box-shadow: ${(props) => props.selected ? null : '-5.5px -5.5px 10.5px #3B4451, 3.5px 3.5px 18.5px #000000'};
  }
`;

export interface FilterButtonProps {
    children: ReactNode;
    click: () => void;
    selected: boolean;
}

export default function FilterButtonStyles({click, children, selected}: FilterButtonProps) {
    return <StyledFilterButton onClick={click} selected={selected}>
        {children}
    </StyledFilterButton>

}