const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const jwtSecret = require('../config/appConfig.json').JWT_SECRCET
const { UnauthorizedError } = require('../_errorHandler/error')
const { failureResponse } = require('./generateResponse')
const authentication = async (req, res, next) => {
    // const header = req.headers.authorization;
    const header = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM0IiwibmFtZSI6Ik1vaGl0IEt1bWFyIiwibW9iaWxlTm8iOiI4NzA4ODY5MTg1IiwibW9iaWxlTm92ZXJpZnkiOiIxIiwiZW1haWwiOiJtb2hpdEBnbWFpbC5jb20iLCJnb29nbGVMb2dpbklkIjpudWxsLCJmYWNlYm9va0xvZ2luSWQiOm51bGwsImRldmljZVRva2VuIjpudWxsLCJzdGF0dXMiOiIxIiwidXNlclR5cGUiOiI1IiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0wNyAxNDoxOToxOSIsImNyZWF0ZWRCeSI6Ik1vaGl0IEt1bWFyIiwibW9kaWZpZWRBdCI6IjIwMjMtMDUtMDUgMTg6MTc6NDYiLCJtb2RpZmllZEJ5IjoiMSIsImlhdCI6MTY4Mzk3NTIyNywiZXhwIjoxNjg2NTY3MjI3fQ.N5j1aTC50bDMxuQCn1OU47TzdEzIHkYCFh05vENSKMA';
    try {
        const decoded = jwt.verify(header, jwtSecret);
        // const decoded = jwt.verify(decoded1, jwtSecret);
        const id = decoded.id
        User.sync()
            .then(() => {
                // Continue with the query after syncing the model
                return User.findByPk(id);
            })
            .then((result) => {
                if (result) {
                    result = JSON.parse(JSON.stringify(result))
                    delete result.password
                    req.user = result
                    next()
                } else {
                    throw new UnauthorizedError("Unauthicated")
                }
            })
            .catch((error) => {
                console.error('Error executing query:', error);
            });
        

    } catch (err) {
        err.statusCode = 401
        failureResponse(req, res, err)
    }

}

module.exports = { authentication }