const indexRouter = require('express').Router();
const indexController = require('../controller/indexController');
const bookStoreController = require('../controller/bookStoreController');
indexRouter.get('/', indexController.index);

indexRouter.get('/getCityNames', indexController.getCityNames);

indexRouter.get('/getBooks/:city/:name', indexController.getBooks);

indexRouter.get('/bookStoreLogin', indexController.bookStoreLogin);
indexRouter.post('/bookStoreLogin', bookStoreController.login);

indexRouter.get('/bookStoreRegister', indexController.bookStoreRegister);
indexRouter.post('/bookStoreRegister', bookStoreController.register);

indexRouter.get('/bookStore',indexController.bookStore)
module.exports = indexRouter;



