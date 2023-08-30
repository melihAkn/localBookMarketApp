const mongoose = require('mongoose');
const schema = mongoose.Schema();

const bookSchema = new schema ({
    name :{
        type : String,
        required : true,
        maxlength : 255,
        minlength : 1,
    },
    publisher :{
        type : String,
        required : true,
        maxlength : 64,
        minlength : 3,
    },
    author : {
        type : String,
        required : true,
        maxlength : 64,
        minlength : 3,
    },
    stock : {
        type : Number,
        required : true,
        maxvalue : 100,
        minvalue : 0,
    },
    publicationDate : {
        type : Date,
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
        minlength : 9,
        maxlength : 13,
    },
    language : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 25,
        
    },
    genre : {
        tpye : String,
        required : true,
        minlength : 3,
        maxlnegth : 64,
    },
    description : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 256,
    },
    averageRating : {
        type : Number,
        required : false,
        default : 0,

    },
  
/*
bunlar duruma gore daha sonra eklenmeli
kitapKapakResmi: Kitabın kapak resminin URL'si veya dosya yolu.
kitapEtiketler: Kitabı daha iyi tanımlamak için kullanılabilecek etiketler veya anahtar kelimeler
*/

},{collection:'books', timestamps: true});

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;