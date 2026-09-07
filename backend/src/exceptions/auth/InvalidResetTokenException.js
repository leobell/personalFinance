const HttpException = require('../index')

class InvalidResetTokenException extends HttpException {
    constructor (
        message = 'Invalid or expired reset token',
        error = 'Bad Request',
        statusCode = 400
    ) {
        super(message, error, statusCode)
    }
}

module.exports = InvalidResetTokenException
