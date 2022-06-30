const currencies = require('./currencies');
const markets = require('./markets');
const price = require('./prices');
const prices = require('./prices');

module.exports = {
    paths:{
        '/currencies':{
            ...currencies,
        },
        '/markets':{
            ...markets,
        },
        '/price':{
            ...price,
        },
        '/prices':{
            ...prices,
        }
    }
}
