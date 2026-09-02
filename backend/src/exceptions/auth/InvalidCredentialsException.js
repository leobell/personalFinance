const HttpException = require('../index')

class InvalidCredentialsException extends HttpException {
    constructor (
        message = 'Invalid email or password',
        error = 'Unauthorized',
        statusCode = 401
    ) {
        super(message, error, statusCode)
    }
}

module.exports = InvalidCredentialsException