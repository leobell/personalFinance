const prisma = require('../../lib/prisma')
const CategoryAlreadyExistsException = require('../../exceptions/category/CategoryAlreadyExistsException')
const CategoryNotFoundException = require('../../exceptions/category/CategoryNotFoundException')
const CategoryInUseException = require('../../exceptions/category/CategoryInUseException')

const DEFAULT_CATEGORIES = [
    { name: 'Spesa', type: 'EXPENSE', color: '#2a78d6' },
    { name: 'Trasporti', type: 'EXPENSE', color: '#eb6834' },
    { name: 'Bollette', type: 'EXPENSE', color: '#1baf7a' },
    { name: 'Intrattenimento', type: 'EXPENSE', color: '#eda100' },
    { name: 'Shopping', type: 'EXPENSE', color: '#e87ba4' },
    { name: 'Salute', type: 'EXPENSE', color: '#008300' },
    { name: 'Stipendio', type: 'INCOME', color: '#4a3aa7' }
]

const createDefaultCategories = async (userId) => {
    await prisma.category.createMany({
        data: DEFAULT_CATEGORIES.map((category) => ({ ...category, userId }))
    })
}

const create = async({ name, color, type, userId }) => {
    try {
        return await prisma.category.create({
            data: { name, color, type, userId }
        })
    } catch (e) {
        if (e.code === 'P2002') {
            throw new CategoryAlreadyExistsException()
        }
        throw e
    }
}

const list = async(userId) => {
    return prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' }
    })
}

const update = async({ id, userId, name, color, type }) => {
    try {
        const result = await prisma.category.updateMany({
            where: { id, userId },
            data: { name, color, type }
        })

        if(result.count === 0){
            throw new CategoryNotFoundException()
        }

        return prisma.category.findUnique({ where: { id } })
    } catch (e) {
        if (e.code === 'P2002') {
            throw new CategoryAlreadyExistsException()
        }
        throw e
    }
}

const remove = async({ id, userId }) => {
    try {
        const result = await prisma.category.deleteMany({
            where: { id, userId }
        })

        if (result.count === 0) {
            throw new CategoryNotFoundException()
        }
    } catch (e) {
        if (e.code === 'P2003' || (e.message && e.message.includes('foreign key constraint'))) {
            throw new CategoryInUseException()
        }
        throw e
    }
}

module.exports  = {
    create,
    list,
    update,
    remove,
    createDefaultCategories
}