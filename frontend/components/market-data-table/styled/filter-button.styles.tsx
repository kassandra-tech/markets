import styled from "styled-components";
import {ReactNode} from "react";

interface StyledProps {
    selected: boolean
}

const StyledFilterButton = styled.button<StyledProps>`
  width: 160px;
  height: 30px;
  background: ${({selected}: StyledProps) => selected ? '#2C2F39' : '#2C2F33' };
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
  outline: none;
  border: 0;
  &:hover {
    background: #2C2F39;
  }
  /*-webkit-box-shadow: ${({selected}: StyledProps) => selected ? 'inset 0px 0px 5px #000000' : '' };
  -moz-box-shadow: ${({selected}: StyledProps) => selected ? 'inset 0px 0px 5px #000000' : '' };
  box-shadow: ${({selected}: StyledProps) => selected ? 'inset 0px 0px 5px #000000' : '' };*/
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