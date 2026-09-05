const express = require('express')
const userController = require('./user.controller')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const user = express.Router()

user.use(authMiddleware)

user.get('/me', userController.getMe)

user.patch('/me', userController.updateProfile)
user.patch('/me/password', userController.updatePassword)

user.delete('/me', userController.deleteAccount)

module.exports = user