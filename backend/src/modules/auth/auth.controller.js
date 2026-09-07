const authService = require('./auth.service')
const jwt = require('jsonwebtoken')

const register = async(req, res, next) => {
    try {
        const { email, password, name, currency } = req.body

        if(!email || !password || !name){
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'email, password and name are required'
                })
        }

        if (password.length < 8) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'password must be at least 8 characters long'
                })
        }

        const result = await authService.register({ email, password, name, currency })
        
        res.status(201)
            .json({
                statusCode: 201,
                message: 'User created successfully',
                result
            })
    } catch (e) {
        next(e)
    }
}

const login = async(req, res, next) => {
    try{
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'email and password are required'
                })
        }

        const result = await authService.login({ email, password })

        res.status(200)
            .json({
                statusCode: 200,
                result
            })
    } catch (e) {
        next(e)
    }
}

const googleCallback = (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`) 
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'email is required'
                })
        }

        await authService.forgotPassword(email)

        res.status(200)
            .json({
                statusCode: 200,
                message: 'If an account with that email exists, a reset link has been sent.'
            })
    } catch (e) {
        next(e)
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const { token, newPassword } = req.body

        if (!token || !newPassword) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'token and newPassword are required'
                })
        }

        if (newPassword.length < 8 ) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'newPassword must be at least 8 characters long'
                })
        }

        await authService.resetPassword({ token, newPassword })

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Password reset successfully'
            })
    } catch (e) {
        next(e)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'token is required'
                })
        }

        await authService.verifyEmail(token)

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Email verified successfully'
            })
    } catch (e) {
        next(e)
    }
}

const resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'email is required'
                })
        }

        await authService.resendVerification(email)

        res.status(200)
            .json({
                statusCode: 200,
                message: 'If an account with that email exists and is not yet verified, a new verification email has been sent.'
            })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    login,
    googleCallback,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification
}