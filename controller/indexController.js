const NodeCache = require('node-cache');
const apicache = require('../cache/apiCall');
const index = (req,res) => {
    res.render('index');
}
const getCityNames = (req,res) => {
    const apiResponse = apicache.get('cityNames');
    res.send(apiResponse);
}
module.exports = {
    index,
    getCityNames
}