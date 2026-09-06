const transactionService = require('./transaction.service')

const create = async(req, res, next) => {
    try {
        const { amount, description, date, type, categoryId } = req.body

        if(!amount || !date || !type || !categoryId) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'amount, date, type and categoryId are required'
                })
        }

        const transaction = await transactionService.create({
            amount,
            description,
            date,
            type,
            categoryId: Number(categoryId),
            userId: req.userId
        })

        res.status(201)
            .json({
                statusCode: 201,
                message: 'Transaction created successfully',
                transaction
            })
    } catch (e) {
        next(e)
    }
}

const list = async(req, res, next) => {
    try {
        const transactions = await transactionService.list(req.userId)

        res.status(200)
            .json({
                statusCode: 200,
                transactions
            })
    } catch (e) {
        next(e)
    }
}

const update = async(req, res, next) => {
    try {
        const { id } = req.params
        const { amount, description, date, type, categoryId } = req.body

        const transaction = await transactionService.update({
            id: Number(id),
            userId: req.userId,
            amount,
            description,
            date,
            type,
            categoryId: categoryId !== undefined ? Number(categoryId) : undefined
        })

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Transaction updated successfully',
                transaction
            })
    } catch (e) {
        next(e)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        await transactionService.remove({ id: Number(id), userId: req.userId })

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Transaction deleted successfully'
            })
    } catch (e) {
        next(e)
    }
}

const summaryByCategory = async(req, res, next) => {
    try {
        const { year, month } = req.query

        if (!year || !month) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'year and month are required'
                })
        }

        const summary = await transactionService.summaryByCategory({ 
            userId: req.userId, 
            year: Number(year), 
            month: Number(month) 
        })

        res.status(200)
            .json({ 
                statusCode: 200, 
                summary 
            })
    } catch (e) {
        next(e)
    }
}

const monthlyTrend = async(req, res, next) => {
    try {
        const { year } = req.query
        const targetYear = year ? Number(year) : new Date().getFullYear()

        const trend = await transactionService.monthlyTrend({
            userId: req.userId,
            year: targetYear
        })

        res.status(200)
            .json({
                statusCode: 200,
                trend
            })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    list,
    update,
    remove,
    summaryByCategory,
    monthlyTrend
}