//
const bookModel = require('../model/bookModel');
const bookStoreModel = require('../model/bookStores');
const bookstoresLogModel = require('../model/bookStoreLogModel');

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
    res.send(responseMessage);

}
const register = async (req, res)  => {
    const insertedBookStore = new bookStoreModel(req.body);
    let responseMessage = {}
    try {
        const result = await insertedBookStore.save();

        if (result) {
             responseMessage = { message: "Successfully registered" };
            res.json(responseMessage);
        } else {
             responseMessage = { message: "Registration failed" };
            res.json(responseMessage);
        }
    } catch (error) {
         responseMessage = { message: "An error occurred during registration", error : error.message };
        res.status(500).json(responseMessage);
    }
}

const addBooks = (req, res) => {





    
    res.send('sasad');
}

const getMyBooks = (req, res) => {
    res.send('sasad');
}




module.exports = {
    login,
    register,
    addBooks,
    getMyBooks,
};