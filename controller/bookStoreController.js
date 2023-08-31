//
const bookModel = require('../model/bookModel');
const bookStoreModel = require('../model/bookStores');
const bookstoresLogModel = require('../model/bookStoreLogModel');

const login = (req, res) => {




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

/*
const signup = async (req,res,next) =>{
    responseMessage ={
        message : ""
    }
    try {
        const email = req.body.email;
        if (!isValidEmail(email)) {
          res.status(400).send('Geçersiz e-posta adresi!');
          return;
        }
        const insertedUser = new UserModel(req.body);
        const result = await  insertedUser.save();
        if(result){
            responseMessage.message ="succesfully register";
        }
        getDateAndWriteLogFile(req.body.userName,responseMessage.message);
        res.json(responseMessage.message);
    } catch (err) {
        next(err);
    }
}
const login = async (req,res,next) =>{
    try{
        let responseMessage ={
            message : "",
            token : "",
        }
        // if email or password is empty 
        if(req.body.email === '' || req.body.password === ''){
            res.json("input cant be equal empty");
            return
        }
        const user = await UserModel.login(req.body.email , req.body.password);
        if(user.name){
            const token = await user.generateToken();
            responseMessage.token = token;
            responseMessage.message ="succesfully login";
            getDateAndWriteLogFile(req.body.email,responseMessage.message);
            

        }
        else{
            responseMessage.message = "email/username or password wrong";
        }
        res.json(responseMessage);
       }    
       catch(error){
        next(error);
       }   
}
*/