const indexRouter = require('express').Router();
const indexController = require('../controller/indexController');

indexRouter.get('/', indexController.index);

indexRouter.get('/getCityNames', indexController.getCityNames);

indexRouter.get('/getBooks/:city/:name', indexController.getBooks);
module.exports = indexRouter;



