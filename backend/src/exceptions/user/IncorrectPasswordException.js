const HttpException = require('../index')

class IncorrectPasswordException extends HttpException {
    constructor(
        message = 'Current password is incorrect',
        error = 'Bad Request',
        statusCode = 400
    ) {
        super(message, error, statusCode)
    }
}

module.exports = IncorrectPasswordException