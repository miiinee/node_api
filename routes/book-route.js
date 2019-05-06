const express = require('express');
const app = express.Router();

const Book = require('../models/book');

app.get('/api/books', (req,res) => {
    Book.find((err, books) => {
        if(err) return res.status(500).send({error: 'database failure'});
        
        res.json(books);
    });
});

module.exports = app;