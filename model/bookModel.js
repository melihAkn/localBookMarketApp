const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema ({
    name :{
        type : String,
        required : true,
        maxLength : 255,
        minLength : 1,
    },
    publisher :{
        type : String,
        required : true,
        maxLength : 64,
        minLength : 3,
    },
    author : {
        type : String,
        required : true,
        maxLength : 64,
        minLength : 3,
    },
    stock : {
        type : Number,
        required : true,
        maxvalue : 100,
        minvalue : 0,
    },
    publicationDate : {
        type : String,
        required : true,
    },
    pageCount : {
        type : Number,
        required : true,
        minvalue : 0,
    },
    ISBN : {
        type : String,
        required : true,
        minLength : 9,
        maxLength : 13,
    },
    language : {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 25,
        
    },
    genre : {
        type : String,
        required : true,
        minLength : 3,
        maxLnegth : 64,
    },
    description : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 256,
    },
    averageRating : {
        type : Number,
        required : false,
        default : 0,

    },
    addingBookStore : {
        type : String,
        required : true,
        
    },
    ownedBookStore : {
        type : String,
        required : false
    }
  
/*
bunlar duruma gore daha sonra eklenmeli
kitapKapakResmi: Kitabın kapak resminin URL'si veya dosya yolu.
kitapEtiketler: Kitabı daha iyi tanımlamak için kullanılabilecek etiketler veya anahtar kelimeler
*/

},{collection:'books', timestamps: true});

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;