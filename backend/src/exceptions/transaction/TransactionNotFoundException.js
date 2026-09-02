const HttpException = require('../index')

class TransactionNotFoundException extends HttpException {
    constructor (
        message = 'Transaction not found',
        error = 'Not Found',
        statusCode = 404
    ) {
        super(message, error, statusCode)
    }
}

module.exports = TransactionNotFoundException