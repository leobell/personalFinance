class HttpException extends Error {
    constructor (message, error, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.error = error
    }
}

module.exports = HttpException