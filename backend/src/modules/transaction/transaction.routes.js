const express = require('express')
const transactionController = require('./transaction.controller')
const authMiddleware = require('../../middlewares/auth/authMiddleware')

const transaction = express.Router()

transaction.use(authMiddleware)

transaction.get('/', transactionController.list)
transaction.get('/summary/by-category', transactionController.summaryByCategory)
transaction.get('/summary/monthly-trend', transactionController.monthlyTrend)

transaction.post('/', transactionController.create)

transaction.patch('/:id', transactionController.update)

transaction.delete('/:id', transactionController.remove)

module.exports = transaction