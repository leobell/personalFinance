const HttpException = require('../../exceptions/index')

const errorHandler = (err, req, res, next) => {
    if(err instanceof HttpException){
        return res.status(err.statusCode)
            .json({
                statusCode: err.statusCode,
                message: err.message,
                error: err.error
            })
    }

    res.status(500)
        .json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Something went wrong on the server'
        })
}

module.exports = errorHandler