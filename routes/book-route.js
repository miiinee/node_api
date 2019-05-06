var express = require('express');
var app = express.Router();

var Book = require('../models/book');

app.get('/api/books', (req,res) => {
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        
        res.json(books);
    });
});

module.exports = app;