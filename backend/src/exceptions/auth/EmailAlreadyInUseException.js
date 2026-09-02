const HttpException = require("../index");

class EmailAlreadyInUseException extends HttpException {
    constructor (
        message = 'Email already in use',
        error = 'Conflict',
        statusCode = 409
    ) {
        super(message, error, statusCode)
    }
}

module.exports = EmailAlreadyInUseException