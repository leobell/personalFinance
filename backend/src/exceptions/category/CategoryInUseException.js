const HttpException = require('../index')

class CategoryInUseException extends HttpException {
    constructor(
        message = 'Cannot delete a category that still has transactions',
        error = 'Conflict',
        statusCode = 409
    ) {
        super(message, error, statusCode)
    }
}

module.exports = CategoryInUseException