const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const markets = require('./markets');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...markets
};
