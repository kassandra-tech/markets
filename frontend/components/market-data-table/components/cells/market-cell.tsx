import {CellStyles} from "../../styled/cell.styles";
import Image from 'next/image';
import bnbIcon from '../../../../public/markets/bnb.png';
import ethIcon from '../../../../public/currencies/eth.png';
import btcIcon from '../../../../public/currencies/btc.png';
import manaIcon from '../../../../public/currencies/mana.png';
import vetIcon from '../../../../public/currencies/vet.png';
import solIcon from '../../../../public/currencies/sol.png';
import tetherIcon from '../../../../public/currencies/tether.png';
// import {Currencies} from "../../../../services/constants";
import styled from "styled-components";

const PaneStyles = styled.span`
  width: 44px;
  height: 15px;
  background: #202226;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.7), inset -2px -2px 2px #484B4E;
  border-radius: 2px;
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const MarketCellStyles = styled.div`
  display: flex;
  flex-direction: column;
  div {
    width: 104px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .acronym {
    font-size: 18px;
    text-transform: uppercase;
  }
`;


export interface MarketCellProps {
    width: number,
    value: {
        currency: string;
        quoteCurrency: string;
        currencyName: string;
    }
}

export default function MarketCell(
    {
        width,
        value
    } : MarketCellProps
) {
    let icon;

    switch (value.currency.toLowerCase()) {
        case 'eth':
            icon = ethIcon;
            break;
        case 'bnb':
            icon = bnbIcon;
            break;
        case 'mana':
            icon = manaIcon;
            break;
        case 'vet':
            icon = vetIcon;
            break;
        case 'sol':
            icon = solIcon;
            break;
        case 'tether':
            icon = tetherIcon;
            break;
        default:
            icon = btcIcon;
    }

    return <CellStyles width={width} justify='space-evenly'>
        <Image src={icon} alt={value.currency}/>
        <MarketCellStyles>
            <div>
                <span className="acronym">{value.currency}</span>
                <PaneStyles>{value.quoteCurrency}</PaneStyles>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00963 3.91629L6.52485 0.864173C6.71933 0.472359 7.28132 0.472359 7.4758 0.864173L8.99101 3.91629L12.3795 4.40875C12.8143 4.47193 12.9875 5.0033 12.6728 5.30809L10.2213 7.6822L10.7999 11.0361C10.8742 11.4669 10.4195 11.7953 10.0305 11.5919L7.00033 10.0075L3.97018 11.5919C3.58118 11.7953 3.12646 11.4669 3.20076 11.0361L3.77931 7.6822L1.32785 5.30809C1.01309 5.0033 1.18637 4.47193 1.62113 4.40875L5.00963 3.91629Z" stroke="#EBD539" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <span className="grey-span">{value.currencyName}</span>
        </MarketCellStyles>

    </CellStyles>
}
