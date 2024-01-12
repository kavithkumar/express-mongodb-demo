const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.set('debug', true)
    return mongoose.connect(process.env.MONGODB_URL)
}

module.exports = { connectDB }