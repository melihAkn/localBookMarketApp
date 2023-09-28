const bookStoreRouter = require('express').Router();
const bookstoreController = require('../controller/bookStoreController');

bookStoreRouter.post("/login",bookstoreController.login);
bookStoreRouter.post("/register",bookstoreController.register);

bookStoreRouter.post("/addBooks",bookstoreController.addBooks);
bookStoreRouter.get("/getMyBooks",bookstoreController.getMyBooks);

bookStoreRouter.get('/findMyInfos',bookstoreController.findMyInfos);

bookStoreRouter.get('/bulkAddBooks',bookstoreController.bulkAdd);
module.exports = bookStoreRouter;
 