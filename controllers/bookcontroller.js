const book = require('../models/book')

const createBook = async (req, res) => {
    try {
        const bk = await book.create(req.body);
        res.status(201).json(bk)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = { createBook }