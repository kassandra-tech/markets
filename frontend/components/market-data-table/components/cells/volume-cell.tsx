import {CellStyles} from "../../styled/cell.styles";
import Image from 'next/image';
import tether from '../../../../public/currencies/tether.png';

export interface VolumeProps {
    width: number;
    value: number;
}

export function VolumeCell({width, value}: VolumeProps) {
    return <CellStyles width={width} justify='start'>
        <Image src={tether} width={30} height={30}/>
        &nbsp;{value}
    </CellStyles>
}