
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
    let citys = [
        "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkâri",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kilis",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Şanlıurfa",
    "Şırnak",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak"
    ]
    res.send(citys);
}
const getBooks = async (req,res) => {
    const searchedCity = req.params.city;
    const searchedName = req.params.name;
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
        res.send(books);
    
}
const getBooksByCity = async (req,res) => {
    const searchedCity = req.params.city;
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
        res.send(books);
}
const bulkAddPage = (req,res) => {
    res.render('bookStoreBulkAdd')
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
    bulkAddPage
}