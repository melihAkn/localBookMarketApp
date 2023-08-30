const mongoose = require('mongoose');
const schema = mongoose.schema;
const bookStoreSchema = new schema({
    bookStoreName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 256,
    },
    bookStoreContactNumber : {
        type : String,
        required : true,

    },
    bookStoreContactEmail : {
        type : String,
        required : false,
        maxlength : 64,
    },
    bookStoreUserName : {
        type : String,
        minlength : 3,
        maxlength : 64,
        required : true,
        trim : true,

    },
    bookStorePassword : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 256,
        trim : true,
    },
    bookStoreAddress : {
        type : String,
        required : true,
        minlength : 3,

    },
    bookStoreCity : {
        type : String,
        required : true,
        maxlength : 64,
        minlength : 1,
        
    },
    bookStoreWebsite : {
        type : URL,
        required : false,
        default : "",

    },
    bookStoreReviewAverage : {
        type : Number,
        required : false,
        default : 0,
        trim : true,
    },
/*  
    bookStoreImage : {
    }
    kirtasiyeUrunleri: Kırtasiye tarafından satılan ürünlerin listesi veya kategorileri.
    bu alanı soyle ekleyeceğim eğer kırtasiye sisteme giriş yapıp kitap eklerse o kitabın bazı bilgilerini bu alana eklerim
*/




},{collecions : 'BookStore',timestamps : true})