// [LOAD PACKAGES]
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;


// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
});

mongoose.connect('mongodb://localhost/mongodb_tutorial', { useNewUrlParser: true });

// DEFINE MODEL
// var Book = require('./models/book');


// [CONFIGURE ROUTER]
// var router = require('./routes') (app, Book);
const index = require('./routes/index');
const book = require('./routes/book-route')
app.use('', index);
app.use('', book);

// [RUN SERVER]
const server = app.listen(port, () => {
    console.log('Express server has started on port ' + port);
});