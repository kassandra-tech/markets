const currencies = require('./currencies');
const markets = require('./markets');

module.exports = {
    paths:{
        '/currencies':{
            ...currencies,
        },
        '/markets':{
            ...markets,
        },
    }
}
