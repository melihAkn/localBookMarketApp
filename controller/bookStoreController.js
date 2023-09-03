//
const bookModel = require('../model/bookModel');
const bookStoreModel = require('../model/bookStores');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
    let responseMessage ={
        message : "",
        token : "",
    }
    try {
        const bookStore = await bookStoreModel.login(req.body.bookStoreUserName , req.body.bookStorePassword);
        if(!bookStore.hata){
            const token = await bookStore.generateToken();
            responseMessage.token = token;
            responseMessage.message ="succesfully login";
        }
        else{
            responseMessage.message = "email/username or password wrong";
        }
    } catch (error) {
        console.log(error.message);     
    }
    res.cookie('token',responseMessage.token,{maxAge : 3600000});
    res.redirect('/index/bookStore');
   

}
const register = async (req, res)  => {
    const insertedBookStore = new bookStoreModel(req.body);
    let responseMessage = {}
    try {
        const result = await insertedBookStore.save();

        if (result) {
             responseMessage = { message: "Successfully registered" };
        } else {
             responseMessage = { message: "Registration failed" };
        }
    } catch (error) {
         responseMessage = { message: "An error occurred during registration", error : error.message };
        
    }
    if(!responseMessage.error ){
        console.log(responseMessage)
        res.redirect('/index/bookStoreLogin');
        
    }
    else{
        res.render('bookStoreRegister', {responseMessage})
    }
   
}

const addBooks = async (req, res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);

    try {
        const findBookStore = await bookStoreModel.findById(jwtResult._id);

        if (!findBookStore) {
            return res.status(404).send('Kitap mağazasİ bulunamadİ');
        }

        const newBook = {
            name: req.body.name,
            publisher: req.body.publisher,
            author: req.body.author,
            stock: req.body.stock,
            publicationDate: req.body.publicationDate,
            pageCount: req.body.pageCount,
            ISBN: req.body.ISBN,
            language: req.body.language,
            genre: req.body.genre,
            description: req.body.description,
            averageRating: req.body.averageRating,
            ownedBookStore : findBookStore.bookStoreName,
        };

        findBookStore.Books.push(newBook);

        await findBookStore.save();

        //console.log('Kitap mağazası güncellendi:', updatedBookStore);

        const insertedBook = new bookModel(req.body);
        insertedBook.addingBookStore = findBookStore.bookStoreName;
        await insertedBook.save();

        res.send('Kitap başarİyla eklendi');
    } catch (err) {
        console.error('Hata oluştu:', err);
        res.status(500).send('Bir hata oluştu');
    }
}

const getMyBooks = async (req, res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    const filter = { _id : jwtResult._id}

    const bookStore = await bookStoreModel.find(filter)
    //console.log(bookStore[0].bookStoreName);
    const filter2 = {addingBookStore : bookStore[0].bookStoreName}
    
    const findingBooks =await bookModel.find(filter2)
    //console.log(findingBooks)
    res.send(findingBooks);




}




module.exports = {
    login,
    register,
    addBooks,
    getMyBooks,
};
