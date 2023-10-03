const indexRouter = require('express').Router();
const indexController = require('../controller/indexController');
const bookStoreController = require('../controller/bookStoreController');

//multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
indexRouter.get('/', indexController.index);

indexRouter.get('/getCityNames', indexController.getCityNames);

indexRouter.get('/getBooks/:city/:name', indexController.getBooks);
indexRouter.get('/getBooksByCity/:city',indexController.getBooksByCity);

indexRouter.get('/bookStoreLogin', indexController.bookStoreLogin);
indexRouter.post('/bookStoreLogin', bookStoreController.login);

indexRouter.get('/bookStoreRegister', indexController.bookStoreRegister);
indexRouter.post('/bookStoreRegister', bookStoreController.register);

indexRouter.get('/bookStoreAddBooks', indexController.bookStoreAddBooks);
indexRouter.post('/bookStoreAddBooks', bookStoreController.addBooks);

indexRouter.get('/bookStoreUpdateInfos', indexController.bookStoreUpdateInfos);
indexRouter.patch('/bookStoreUpdateInfos', bookStoreController.updateMyInfos);

indexRouter.get('/bookStoreBulkAddBook',indexController.bulkAddPage)
//indexRouter.post('/bookStoreBulkAddBooks',bookStoreController.bulkAdd)

indexRouter.post('/bookStoreBulkAddBook', upload.single('jsonFile'), bookStoreController.bulkAdd);

indexRouter.delete('/bookStoreDeleteBooks/:barcodNo', bookStoreController.deleteBooks);

indexRouter.patch('/bookStoreUpdateBooks',bookStoreController.updateBooks)

indexRouter.get('/bookStore',indexController.bookStore)
module.exports = indexRouter;



