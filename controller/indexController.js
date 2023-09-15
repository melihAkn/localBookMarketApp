const NodeCache = require('node-cache');
const apicache = require('../cache/apiCall');

const bookStoreModel = require('../model/bookStores');

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
module.exports = {
    index,
    getCityNames,
    getBooks,
    bookStoreLogin,
    bookStoreRegister,
    bookStore,
    bookStoreAddBooks,
    bookStoreUpdateInfos,
}  