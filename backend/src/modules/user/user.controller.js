const userService = require('./user.service')

const getMe = async(req, res, next) => {
    try{
        const user = await userService.getMe(req.userId)
        res.status(200)
            .json({
                statusCode: 200,
                user
            })
    } catch (e) {
        next(e)
    }
}

const updateProfile = async(req, res, next) => {
    try {
        const { name, currency } = req.body
        const user = await userService.updateProfile( req.userId, { name, currency })
        res.status(200)
            .json({
                statusCode: 200,
                message: 'Profile updated successfully',
                user
            })
    } catch (e) {
        next(e)
    }
}

const updatePassword = async(req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (!currentPassword || !newPassword) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'currentPassword and newPassword are required'
                })
        }

        if (newPassword.length < 8) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'newPassword must be at least 8 characters long'
                })
        }

        await userService.updatePassword(req.userId, { currentPassword, newPassword })
        res.status(200)
            .json({
                statusCode: 200,
                message: 'Password updated successfully'
            })
    } catch (e) {
        next(e)
    }
}

const deleteAccount = async(req, res, next) => {
    try {
        await userService.deleteAccount(req.userId)
        res.status(200)
            .json({
                statusCode: 200,
                message: 'Account deleted successfully'
            })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getMe,
    updateProfile,
    updatePassword,
    deleteAccount
}