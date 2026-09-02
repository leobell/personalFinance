const HttpException = require('../index')

class CategoryNotFoundException extends HttpException {
    constructor(
        message = 'Category not found',
        error = 'Not Found',
        statusCode = 404
    ) {
        super(message, error, statusCode)
    }
}

module.exports = CategoryNotFoundException