const express = require('express')
const authController = require('./auth.controller')
const passport = require('../../lib/passport')

const auth = express.Router()

auth.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
auth.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }), authController.googleCallback)

auth.post('/register', authController.register)
auth.post('/login', authController.login)

module.exports = auth