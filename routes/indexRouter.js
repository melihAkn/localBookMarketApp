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

indexRouter.get('/bookStoreAddBooks', indexController.bookStoreAddBooks);
indexRouter.post('/bookStoreAddBooks', bookStoreController.addBooks);

indexRouter.get('/bookStoreUpdateInfos', indexController.bookStoreUpdateInfos);
indexRouter.patch('/bookStoreUpdateInfos', bookStoreController.updateMyInfos);

indexRouter.get('/bookStore',indexController.bookStore)
module.exports = indexRouter;



