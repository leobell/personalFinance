require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4000
const app = express()

//middlewares

const errorHandler = require('./middlewares/error/errorHandler')

//routes
const authRoute = require('./modules/auth/auth.routes')
const categoryRoute = require('./modules/category/category.routes')
const transactionRoute = require('./modules/transaction/transaction.routes')

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/transactions', transactionRoute)

app.use(errorHandler)
app.listen(PORT, () => console.log(`Flowly API listening on port ${PORT}`))