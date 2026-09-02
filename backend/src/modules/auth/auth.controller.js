const authService = require('./auth.service')

const register = async(req, res, next) => {
    try {
        const { email, password, name, currency } = req.body

        if(!email || !password || !name){
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Email, password and name are required'
                })
        }

        const result = await authService.register({ email, password, name, currency })
        
        res.status(201)
            .json({
                statusCode: 201,
                message: 'User created succesfully',
                result
            })
    } catch (e) {
        next(e)
    }
}

const login = async(req, res, next) => {
    try{
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad request',
                    message: 'email and password are required'
                })
        }

        const result = await authService.login({ email, password })

        res.status(200)
            .json({
                statusCode: 200,
                result
            })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    login
}