const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = { 
    authLimiter, 
    apiLimiter 
}