require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 4000
const app = express()
const passport = require('./lib/passport')

//middlewares
const errorHandler = require('./middlewares/error/errorHandler')
const { apiLimiter } = require('./middlewares/rateLimit/rateLimiter')

//routes
const authRoute = require('./modules/auth/auth.routes')
const categoryRoute = require('./modules/category/category.routes')
const transactionRoute = require('./modules/transaction/transaction.routes')
const userRoute = require('./modules/user/user.routes')

const corsOptions = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(passport.initialize())
app.use('/api', apiLimiter)

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/transactions', transactionRoute)
app.use('/api/users', userRoute)

app.use(errorHandler)
app.listen(PORT, () => console.log(`Flowly API listening on port ${PORT}`))