const express = require('express');
const { createBook } = require('../controllers/bookcontroller');

const bookrouter = express.Router();

bookrouter.post('/', createBook)
module.exports = bookrouter