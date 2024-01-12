const jwt = require('jsonwebtoken');
const CustomApiError = require('../error/customApiError');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    //if there is no token
    //ther is a token , but it does not starts with Bearer
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // throw new Error('Not Authorized', 401)
        //after error handler function
        next(new CustomApiError('Not Authorized',401))//go to error handler
    }
    try {
        //take the payload which contains the data.
        const token = authHeader.split(' ')[1];
        console.log(token)
        const decoded = jwt.verify(token, 'THISISMYSECRETKEY');
        //FETCH THE USER DETAILS
        const { email, username, role } = decoded;
        req.user = { email, username, role }
        next()
    }
    catch (err) {
        console.log(err)
        // throw new Error('Not a valid token', 401)
        next(new CustomApiError('Not a valid token',401))
    }
}

module.exports = { authMiddleware }