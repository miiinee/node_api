const express = require('express');
const router = express.Router();

const account = require('./account');
const book = require('./book');
const memo = require('./memo');

router.use('/accounts', account);
router.use('/books', book);
router.use('/memos', memo);


module.exports = router;