const jwt = require('jsonwebtoken')
const UnauthorizedException = require('../../exceptions/auth/UnauthorizedException')

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization

    if(!header || !header.startsWith('Bearer ')){
        return next(new UnauthorizedException('Missing or invalid Authorization header'))
    }

    const token = header.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.userId
        next()
    } catch (e) {
        next(new UnauthorizedException('Invalid or expired token'))
    }
}

module.exports = authMiddleware