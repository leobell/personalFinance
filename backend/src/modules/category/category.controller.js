const categoryService = require('./category.service')

const create = async(req, res, next) => {
    try {
        const { name, color, type } = req.body

        if(!name || !type) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'name and type are required'
                })
        }

        const category = await categoryService.create({ name, color, type, userId: req.userId })

        res.status(201)
            .json({
                statusCode: 201,
                message: 'Category created successfully',
                category
            })
    } catch (e) {
        next(e)
    }
}

const list = async(req, res, next) => {
    try{
        const categories = await categoryService.list(req.userId)

        res.status(200)
            .json({
                statusCode: 200,
                categories
            })
    } catch (e) {
        next(e)
    }
}

const update = async(req, res, next) => {
    try {
        const { id } = req.params
        const { name, color, type } = req.body

        const category = await categoryService.update({
            id: Number(id),
            userId: req.userId,
            name,
            color,
            type
        })

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Category updated successfully',
                category
            })
    } catch (e) {
        next(e)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        await categoryService.remove({ id:Number(id), userId: req.userId })

        res.status(200)
            .json({
                statusCode: 200,
                message: 'Category deleted successfully'
            })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    list,
    update,
    remove
}