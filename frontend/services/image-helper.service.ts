import bnb from '../public/markets/bnb.png'
import exodus from '../public/markets/exodus.png';
import cryptoCom from '../public/markets/crypto-com.png';
import ftx from '../public/markets/ftx.png';
import coinBase from '../public/markets/coinbase.png';
import huobiGlobal from '../public/markets/huobi-global.png';
import bittrex from '../public/markets/bittrex.png';
import {StaticImageData} from "next/image";

export function getMarketIconByName(name: string): StaticImageData {
    let image;
    switch (name.toLowerCase()) {
        case 'exodus':
            image = exodus;
            break;
        case 'cryptocom':
            image = cryptoCom;
            break;
        case 'ftx':
            image = ftx;
            break;
        case 'coinbase':
            image = coinBase;
            break;
        case 'bittrex':
            image = bittrex;
            break;
        case 'huobiglobal':
            image = huobiGlobal;
            break;
        default:
            image = bnb;
    }
    return image;
}