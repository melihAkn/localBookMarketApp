//required packages
const mongoose = require('mongoose');
const Books = require('./bookModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


//schema
const schema = mongoose.Schema;
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
        type : String,
        required : false,
        default : "",

    },
    bookStoreReviewAverage : {
        type : Number,
        required : false,
        default : 0,
        trim : true,
    },
    Books : {
        type : Array,
       Books : [{ type: String }],
       required : false,
       default : []
 
    }
},{collecions : 'BookStore',timestamps : true});


bookStoreSchema.methods.generateToken =  function(){
    const loginnedBookStore = this;
    const token =  jwt.sign({_id:loginnedBookStore._id},
        `${secretKey}`,{expiresIn:'1h'});
    return token;
}
bookStoreSchema.statics.login = async (username , password) => {
    const filter = {
        bookStoreUserName : username,
        bookStorePassword : password
      };
    const bookStoreFind = await BookStore.findOne(filter);
    if(!bookStoreFind){
       return {
        hata : "username or password is wrong"
       }
    }
        return bookStoreFind;
}
const BookStore = mongoose.model('BookStore', bookStoreSchema);
module.exports = BookStore;


