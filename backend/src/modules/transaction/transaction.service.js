const prisma = require('../../lib/prisma')
const CategoryNotFoundException = require('../../exceptions/category/CategoryNotFoundException')
const TransactionNotFoundException = require('../../exceptions/transaction/TransactionNotFoundException')

const create = async({ amount, description, date, type, categoryId, userId }) => {
    const category = await prisma.category.findFirst({
        where: { id: categoryId, userId }
    })

    if (!category) {
        throw new CategoryNotFoundException()
    }

    return prisma.transaction.create({
        data: {
            amount,
            description,
            date: new Date(date),
            type,
            categoryId,
            userId
        }
    })
}

const list = async(userId) => {
    return prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: { date: 'desc' }
    })
}

const update = async({ id, userId, amount, description, date, type, categoryId }) => {
    if (categoryId !== undefined) {
        const category = await prisma.category.findFirst({
            where: { id: categoryId, userId }
        })

        if (!category) {
            throw new CategoryNotFoundException()
        }
    }

    const result = await prisma.transaction.updateMany({
        where: { id, userId },
        data: {
            amount,
            description,
            date: date ? new Date(date) : undefined,
            type,
            categoryId
        }
    })

    if (result.count === 0 ) {
        throw new TransactionNotFoundException()
    }

    return prisma.transaction.findUnique({
        where: { id },
        include: { category: true }
    })
}

const remove = async({ id, userId }) => {
    const result = await prisma.transaction.deleteMany({
        where: { id, userId }
    })

    if (result.count === 0) {
        throw new TransactionNotFoundException()
    }
}

const summaryByCategory = async({ userId, year, month }) => {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 1)

    const grouped = await prisma.transaction.groupBy({
        by: ['categoryId'],
        where: {
            userId,
            type: 'EXPENSE',
            date: {gte: start, lt: end}
        },
        _sum: { amount: true }
    })

    const categories = await prisma.category.findMany({ where: { userId } })
    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

    return grouped.map((g) => ({
        category: categoryMap[g.categoryId]?.name ?? 'Unknown',
        color: categoryMap[g.categoryId]?.color ?? '#999999',
        total: g._sum.amount
    }))
}

const monthlyTrend = async ({ userId, year }) => {
    return prisma.$queryRaw`
        SELECT
            date_trunc('month', "date") AS month,
            "type",
            SUM("amount") AS total
        FROM "Transaction"
        WHERE "userId" = ${userId}
            AND EXTRACT(YEAR FROM "date") = ${year}
        GROUP BY month, "type"
        ORDER BY month ASC
    `
}

module.exports = {
    create,
    list,
    update,
    remove,
    summaryByCategory,
    monthlyTrend
}