const BaseError = require('./baseError')

class OkError extends BaseError {
    constructor(
        name,
        statusCode = 200,
        description = '2XX',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

class HandlingError extends BaseError {
    constructor(
        name,
        statusCode = 200,
        description = '2XX/INTERNAL',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = { OkError, HandlingError }