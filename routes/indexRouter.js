const indexRouter = require('express').Router();
const indexController = require('../controller/indexController');

indexRouter.get('/', indexController.index);

indexRouter.get('/getCityNames', indexController.getCityNames);

module.exports = indexRouter;



