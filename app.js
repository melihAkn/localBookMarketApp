//gerekli paketler
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config();


//uygulamanın başlatılması
marketApp = express();
marketApp.use(express.urlencoded({ extended:false}));
marketApp.use(express.json());
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

//rota tanimi ve template engine ayarlaması
marketApp.use('/index', indexRouter);
marketApp.use('bookStore', bookStoreRouter);
marketApp.set('view engine', 'hbs');
marketApp.set('views', path.join(__dirname, 'views'));

//server başlangici
marketApp.listen(3000, _ => {
    console.log("server 3000 portundan ayaklandi");
})

