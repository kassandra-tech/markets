import styled from "styled-components";

interface StyledHeaderProps {
    width?: number;
}

export const Header = styled.div<StyledHeaderProps>`
    height: 40px;
    width: ${({width}: StyledHeaderProps) => width ? width + 'px' : 'auto'};
    background: linear-gradient(180deg, #2C3035 0%, #1D1F23 100%);
    box-shadow: 5.09045e-15px 83.1333px 166.267px rgba(7, 8, 9, 0.3765), inset -2.02487e-15px -33.0686px 33.0686px #1A1C20, inset 2.02487e-15px 33.0686px 33.0686px #2E3238;
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
    .sorting {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }
`;