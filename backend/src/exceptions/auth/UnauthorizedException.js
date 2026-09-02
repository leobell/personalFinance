const HttpException = require('../index')

class UnauthorizedException extends HttpException {
    constructor(
        message = 'Unauthorized',
        error = 'Unauthorized',
        statusCode = 401
    ) {
        super(message, error, statusCode)
    }
}

module.exports = UnauthorizedException