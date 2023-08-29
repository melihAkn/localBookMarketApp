const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');


marketApp = express();
marketApp.use(express.urlencoded({ extended:false}));
marketApp.use(express.json());
marketApp.use(express.static('public')); 

//env file
require('dotenv').config();
const connectionString = process.env.CONNECTION_STRING;

// MongoDB connect and config
mongoose.connect(`${connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("baglanti basarili"))
  .catch(e => { console.log(e)});

const indexRouter = require('./routes/indexRouter');

marketApp.use('/index',indexRouter);
marketApp.set('view engine', 'hbs');
marketApp.set('views', path.join(__dirname, 'views'));
marketApp.listen(3000, _ => {
    console.log("server 3000 portundan ayaklandi");
})



