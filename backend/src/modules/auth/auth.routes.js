const express = require('express')
const authController = require('./auth.controller')
const passport = require('../../lib/passport')
const { authLimiter } = require('../../middlewares/rateLimit/rateLimiter')

const auth = express.Router()

auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
auth.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }), authController.googleCallback)

auth.post('/register', authLimiter, authController.register)
auth.post('/login', authLimiter, authController.login)
auth.post('/forgot-password', authLimiter, authController.forgotPassword)
auth.post('/reset-password', authLimiter, authController.resetPassword)
auth.post('/verify-email', authController.verifyEmail)
auth.post('/resend-verification', authLimiter, authController.resendVerification)

module.exports = auth