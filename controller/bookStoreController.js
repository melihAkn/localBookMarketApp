const bookModel = require('../model/bookModel');
const bookStoreModel = require('../model/bookStores');
const fs = require('fs');
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
            res.cookie('token',responseMessage.token,{maxAge : 3600000});
            res.redirect('/index/bookStore');
        }
        else{
            responseMessage.message = "email/username or password wrong";
            res.render('bookStoreLogin',{message : bookStore})
        }
    } catch (error) {
        console.log(error.message);     
    }
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
    console.log(req.body)
    try {
        const findBookStore = await bookStoreModel.findById(jwtResult._id);
        if (!findBookStore) {
            return res.status(404).send('cannot find bookStore');
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
            ownedBookStore : findBookStore.bookStoreName
        };
        findBookStore.Books.push(newBook);
        await findBookStore.save();
        const insertedBook = new bookModel(req.body);
        insertedBook.addingBookStore = findBookStore.bookStoreName;
        await insertedBook.save();
        res.send('book was added succesfully');
    } catch (err) {
        res.setHeader('errorMessage', err.message);
        console.error('error:', err.message);
        res.status(500).json(err.message);
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
const findMyInfos = async (req,res)  => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    const filter = { _id : jwtResult._id};
    const bookStore = await bookStoreModel.find(filter ,{ _id: 0 , Books : 0 ,createdAt : 0 , updatedAt : 0, __v : 0 });
    res.send(bookStore);
}
const updateMyInfos = async (req,res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    const filter = { _id : jwtResult._id};
    const update = await bookStoreModel.updateOne(filter, { $set: req.body });
    if(update) {
        res.send('success')
    }
}
const deleteBooks = async (req,res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    let booksFilter = {ISBN : req.params.barcodNo}
    const books = await bookModel.find(booksFilter)
    let bookStore
    books.forEach(e => {
        bookStore = e.addingBookStore
    });
    if(!books[0]){
        res.send("The entered barcode does not match any book.")
        return
    }else if(books){
        const findedBookStore = await bookStoreModel.find({_id : jwtResult._id})
        let array = []
        findedBookStore[0].Books.forEach((e) => {
             if(e.ISBN === req.params.barcodNo){
            } else{
                array.push(e)
            }
        });
        bookStoreModel.collection.updateOne(
            { _id: findedBookStore[0]._id },
            { $set: { Books: [] } } 
    ); 
    bookStoreModel.collection.updateOne(
        { _id: findedBookStore[0]._id }, 
        { $set: { Books: array } } 
      );
    } 
    await bookModel.deleteOne(booksFilter)
    array = []
    res.send("Book successfully deleted")
}
const updateBooks = async (req,res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    let booksFilter = {ISBN : req.params.barcodNo}
    const books = await bookModel.find(booksFilter)
    let bookStore
    books.forEach(e => {
        bookStore = e.addingBookStore
    });
    if(!books[0]){
        res.send("The entered barcode does not match any book.")
        return
    }else if(books){
        const findedBookStore = await bookStoreModel.find({_id : jwtResult._id})
        let array = []
        findedBookStore[0].Books.forEach((e) => {
             if(e.ISBN === req.params.barcodNo){
            } else{
                array.push(e)
            }
        });
    }
}

const bulkAdd = async (req,res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    const jsonFile = req.file;
    console.log(req.file)
   
    if (!jsonFile) {
        return res.status(400).json({ error: 'file not uploaded.' });
    }
    try {
        fs.readFile(req.file.path,'utf-8' ,async (err,data) => {
            if (err) {
                console.error('file read error:', err);
            }
        const jsonData = JSON.parse(data)
        console.log(jsonData)
        const findBookStore = await bookStoreModel.findById(jwtResult._id);
        if (!findBookStore) {
            return res.status(404).send('cannot find bookStore');
        }
            for (const e of jsonData) {
                const newBook = {
                    name: e.name,
                    publisher: e.publisher,
                    author: e.author,
                    stock: e.stock,
                    publicationDate: e.publicationDate,
                    pageCount: e.pageCount,
                    ISBN: e.ISBN,
                    language: e.language,
                    genre: e.genre,
                    description: e.description,
                    averageRating: e.averageRating,
                };
                console.log(newBook)
                const insertedBook = new bookModel(newBook);
                insertedBook.addingBookStore = findBookStore.bookStoreName;
                
                try {
                    await insertedBook.save();
                    findBookStore.Books.push(newBook);
                    await findBookStore.save();
                } catch (error) {
                    console.error("error:", error);
                    return
                }
            }
          
        })
        return res.status(200).send({ message: 'The file has been successfully processed, and the books have been added successfully.' });
    } catch (error) {
        return res.status(400).send({ error: 'Its not a valid JSON file.' });
    }
} 


module.exports = {
    login,
    register,
    addBooks,
    getMyBooks,
    findMyInfos,
    updateMyInfos,
    deleteBooks,
    bulkAdd,
    updateBooks
};
