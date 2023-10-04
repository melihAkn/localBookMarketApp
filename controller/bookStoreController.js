//
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
            ownedBookStore : findBookStore.bookStoreName
        };
        findBookStore.Books.push(newBook);

        await findBookStore.save();

        const insertedBook = new bookModel(req.body);
        insertedBook.addingBookStore = findBookStore.bookStoreName;
        await insertedBook.save();

        res.send('Kitap başariyla eklendi');
        
    } catch (err) {
        res.setHeader('errorMessage', err.message); // Özel başlık ekleyin
        console.error('Hata oluştu:', err.message);
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
        res.send('islem basarili')
    }else {
        res.send('hata')
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
        res.send("girdiginiz barkod no ile eslesen kitap yok")
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
            { _id: findedBookStore[0]._id }, // Belgeyi tanımlayan koşul
            { $set: { Books: [] } } // Diziyi boş bir dizi olarak güncelle
    ); 
    bookStoreModel.collection.updateOne(
        { _id: findedBookStore[0]._id }, // Belgeyi tanımlayan koşul
        { $set: { Books: array } } // Yeni diziyi belgeye ekleyin
      );
    } 
    await bookModel.deleteOne(booksFilter)
    array = []
    res.send("kitap basari ile silindi")

}

const updateBooks = async (req,res) => {

}

const bulkAdd = async (req,res) => {
    const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ', ''), secretKey);
    const jsonFile = req.file;
    console.log(jwtResult)
    console.log(jsonFile)
    if(!jwtResult){
        return res.status(400).json({ error: 'token hatasi' });
    }
    if (!jsonFile) {
        return res.status(400).json({ error: 'Dosya yüklenmedi.' });
    }

    try {
        const jsonData = JSON.parse(jsonFile.buffer.toString());
        console.log(jsonData)
        const findBookStore = await bookStoreModel.findById(jwtResult._id);
        if (!findBookStore) {
            return res.status(404).send('Kitap magazasi bulunamadi');
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
        
                const insertedBook = new bookModel(newBook);
                insertedBook.addingBookStore = findBookStore.bookStoreName;
                
                // await ile veritabanına kaydet
                try {
                    await insertedBook.save();
                    findBookStore.Books.push(newBook);
                    await findBookStore.save();
                } catch (error) {
                    console.error("Hata oluştu:", error);
                }
            }
        return res.status(200).json({ message: 'Dosya başarıyla işlendi ve Kitaplar başariyla eklendi.' });
    } catch (error) {
        return res.status(400).json({ error: 'Geçerli bir JSON dosyası değil.' });
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
    updateBooks,
    bulkAdd
};
