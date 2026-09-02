const express = require('express')
const categoryController = require('./category.controller')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const category = express.Router()

category.use(authMiddleware)

category.get('/', categoryController.list)

category.post('/', categoryController.create)

category.patch('/:id', categoryController.update)

category.delete('/:id', categoryController.remove)

module.exports = category