const HttpException = require('../index')

class InvalidVerificationTokenException extends HttpException {
    constructor (
        message = 'Invalid or expired verification token',
        error = 'Bad Request',
        statusCode = 400
    ) {
        super(message, error, statusCode)
    }
}

module.exports = InvalidVerificationTokenException
