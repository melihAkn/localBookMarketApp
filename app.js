//necessary packages
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const axios = require('axios');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
//app start
marketApp = express();
marketApp.use(express.json());
marketApp.use(express.urlencoded({ extended:true}));
marketApp.use(express.static('public')); 
// MongoDB connect and config
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(`${connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("baglanti basarili"))
  .catch(e => { console.log(e)});

//routers
const indexRouter = require('./routes/indexRouter');
const bookStoreRouter = require('./routes/bookStoreRouter');

//route and template engine settings
marketApp.use('/index', indexRouter);
marketApp.use('/bookStore', bookStoreRouter);
marketApp.use(cookieParser());
marketApp.set('view engine', 'hbs');
marketApp.set('views', path.join(__dirname, 'views'));
marketApp.use(express.static('public'));
//server start
marketApp.listen(3000, _ => {
    console.log("server 3000 portundan ayaklandi");
})

marketApp.get('/', (req, res) => {
  res.redirect('/index')
})

