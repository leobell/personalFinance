const HttpException = require('../index')

class PasswordChangeNotAllowedException extends HttpException {
    constructor (
        message = 'This account does not use a password. Password change is not available.',
        error = 'Bad Request',
        statusCode = 400
    ) {
        super(message, error, statusCode)
    }
}

module.exports = PasswordChangeNotAllowedException