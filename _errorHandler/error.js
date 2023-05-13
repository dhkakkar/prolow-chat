const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class ForbiddenError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.FORBIDDEN,
        description = 'Forbidden',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
class BadRequestError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Bad request.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
class UnauthorizedError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description = 'Unauthorized',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}


class NotFoundError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
class InternalServerError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Internal Server Error',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}


module.exports = { ForbiddenError, BadRequestError, UnauthorizedError, NotFoundError, InternalServerError }