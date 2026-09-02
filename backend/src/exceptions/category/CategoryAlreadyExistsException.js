const HttpException = require('../index')

class CategoryAlreadyExistsException extends HttpException {
    constructor(
        message = 'Category with this name and type already exists',
        error = 'Conflict',
        statusCode = 409
    ) {
        super(message, error, statusCode)
    }
}

module.exports = CategoryAlreadyExistsException