const express = require('express');
const router = express.Router();

const account = require('./account');
const book = require('./book');
const memo = require('./memo');

router.use('/accounts', account);
router.use('/books', book);
router.use('/memos', memo);

const request = require('request');

router.get('/naver', (req, res) => {
    request({
        headers: {
            'X-Naver-Client-Id' : 'LoAPjZT8ux7FDsA5bEB8',
            'X-Naver-Client-Secret' : '7TjRCBCOLq'
        },
        uri: 'https://openapi.naver.com/v1/search/book.json',
        qs: {
          query: '명견',
          display: 10,
          start: 1
        }
      }).pipe(res);
});

module.exports = router;