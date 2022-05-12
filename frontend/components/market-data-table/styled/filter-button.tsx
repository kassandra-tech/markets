import styled from "styled-components";
import {ReactNode} from "react";

const StyledFilterButton = styled.button`
  width: 160px;
  height: 30px;
  background: #2C2F33;
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
`;

export interface FilterButtonProps {
    children: ReactNode;
    click: () => void;
}

export default function FilterButton({click, children}: FilterButtonProps) {
    return <StyledFilterButton onClick={click}>
        {children}
    </StyledFilterButton>

}