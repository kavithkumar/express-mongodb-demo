const User = require('../models/user1')
const jwt = require('jsonwebtoken')

const register = async(req, res)=> {
    const user = req.body;
    try {
        const createdUser = await User.create(user)
        res.status(200).json(createdUser)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ 'message': error.message })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ 'email': email, 'password': password })
        if (!user)
            res.status(401).json({ 'msg': 'Invalid email/password' })
        else {
            //Generate Json Web Token
            const { email, username, role } = user;
            const token = jwt.sign({ email, username, role }, process.env.JSON_SECRETKEY, { expiresIn: '1800s' })
            res.status(200).json(token)
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {login,register}







