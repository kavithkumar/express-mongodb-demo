const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    "title": String,
    "price": Number,
    "author": String
})

module.exports = mongoose.model('book', BookSchema)