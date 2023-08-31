const indexRouter = require('express').Router();
const indexController = require('../controller/indexController');

indexRouter.get('/', indexController.index);


module.exports = indexRouter;



