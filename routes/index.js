const express = require('express');
const app = express.Router();

const Book = require('../models/book');

// module.exports = function(app, Book) {

    // GET ALL BOOKS
    // app.get('/api/books', function(req,res){
    //     Book.find(function(err, books){
    //         if(err) return res.status(500).send({error: 'database failure'});
            
    //         res.json(books);
    //     });
    // });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', (req, res) => {
        Book.findOne({_id: req.params.book_id}, (err, book) => {
            if(err) return res.status(500).json({error: err});
            
            if(!book) return res.status(404).json({error: 'book not found'});
            
            res.json(book);
        });
    });

    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', (req, res) => {
        // 두 번째 인자: projection - author 값으로 찾아서 title 과 published_date 만 출력
        // projection 안주면 모든 field나옴, projection 내에 field 생략하면 default 0(false)(_id: 1(default))
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1}, (err, books) => {
            if(err) return res.status(500).json({error: err});
            
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            
            res.json(books);
        });
    });

    // CREATE BOOK
    app.post('/api/books', (req, res) => {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        // book.published_date = new Date(req.body.published_date); // default: Date.now

        book.save(err => {
            if(err) {
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', (req, res) => {
        // 1. 기존 document 조회 -> update
        Book.findById(req.params.book_id, (err, book) => {
            if(err) return res.status(500).send({error: 'database failure'});

            if(!book) return res.status(404).json({error: 'book not found'});

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(err => {
                if(err) res.status(500).json({error: 'failed to update'});;
    
                res.json({message: 'book updated'});
    
            });
        });

        // 2. update
        // Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
        //     if(err) res.status(500).json({ error: 'database failure' });
        //     console.log(output);
        //     if(!output.n) return res.status(404).json({ error: 'book not found' });
        //     res.json( { message: 'book updated' } );
        // });

        /*
            output: mongod에서 출력하는 결과물
                { 
                    ok: 1, 
                    nModified: 0, (변경한 document 수)
                    n: 1 (select된 document 수)
                }
        */
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', (req, res) => {
        Book.deleteOne({ _id: req.params.book_id }, (err, output) => {
            if(err) return res.status(500).json({ error: "database failure" });
    

            // 실제로 존재하는 데이터를 삭제하였는지 확인해주는 코드이나, 그럴 필요가 없으므로 주석처리
            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */
    
            // 204 HTTP status: No Content, 요청한 작업을 수행하였고 데이터를 반환 할 필요가 없다는것을 의미
            res.status(204).end();
        });
    });

// }
module.exports = app;