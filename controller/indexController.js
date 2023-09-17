const NodeCache = require('node-cache');
const apicache = require('../cache/apiCall');

const bookStoreModel = require('../model/bookStores');
const booksModel = require('../model/bookModel');
const index = (req,res) => {
    res.render('index');
}

const bookStore = (req,res) => {

    res.render('bookStore');
}
const bookStoreLogin = (req,res) => {

    res.render('bookStoreLogin');
}
const bookStoreRegister = (req,res) => {
    res.render('bookStoreRegister');
}
const bookStoreAddBooks = (req,res) => {
    res.render('bookStoreAddBooks');
}
const bookStoreUpdateInfos = (req,res) => {
    res.render('bookStoreUpdateInfos');
}
const getCityNames = (req,res) => {
    const apiResponse = apicache.get('cityNames');
    res.send(apiResponse);
}
const getBooks = async (req,res) => {
    const searchedCity = req.params.city;
    const searchedName = req.params.name;
    console.log(searchedCity +" " + searchedName)
    let filter = {bookStoreCity : searchedCity };

    const findedBookStore = await bookStoreModel.find(filter);
    let books = [];
    //console.log(findedBookStore)
    findedBookStore.forEach(e => {
        e.Books.forEach( e => {
            if(e.name.includes(searchedName)) {
                books.push(e);
                
            }else if(e.name === null){
            }
        }) 
    });
    console.log(books)
        res.send(books);
    
}
const getBooksByCity = async (req,res) => {
    const searchedCity = req.params.city;
    console.log(searchedCity)
    let filter = {bookStoreCity : searchedCity };
    const findedBookStore = await bookStoreModel.find(filter);
    let books = [];
    //console.log(findedBookStore)
    findedBookStore.forEach(e => {
        e.Books.forEach( e => {
                books.push(e);
             if(e.name === null){
            }
        }) 
    });
    console.log(books)
        res.send(books);
}


const bookStoreDeleteBooks =async (req,res) => {
    let filter = {ISBN : req.params.barcodNo}
    const books = await booksModel.find(filter)
    let bookStore
    //console.log(books)
    books.forEach(e => {
        bookStore = e.addingBookStore
    });
    
    if(!books){
        res.send("girdiginiz barkod no ile eslesen kitap yok")
    }else if(books){
        
        console.log("calis")
        const dene = await bookStoreModel.find({bookStoreName : bookStore})
      
        console.log(dene)
        console.log(bookStore)
        dene[0].Books.forEach((e) => {
             if(e.ISBN === req.params.barcodNo){
             console.log(e)
             console.log("esit")
             e[0] = null
            }
        }); 
    }
    
    await booksModel.deleteOne(filter)
    res.send()


}


module.exports = {
    index,
    getCityNames,
    getBooks,
    bookStoreLogin,
    bookStoreRegister,
    bookStore,
    bookStoreAddBooks,
    bookStoreUpdateInfos,
    getCityNames,
    getBooksByCity,
    bookStoreDeleteBooks
}  