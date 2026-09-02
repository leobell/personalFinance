const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../../lib/prisma')
const EmailAlreadyInUseException = require('../../exceptions/auth/EmailAlreadyInUseException')
const InvalidCredentialsException = require('../../exceptions/auth/InvalidCredentialsException')
const SALT_ROUNDS = 10

const register = async({ email, password, name, currency }) => {
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
        throw new EmailAlreadyInUseException()
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await prisma.user.create({
        data: { email, passwordHash, name, currency }
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return {
        token,
        user: { id:user.id, email:user.email, name: user.name, currency: user.currency },
    }
}

const login = async({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } })

    if(!user){
        throw new InvalidCredentialsException()
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if(!valid){
        throw new InvalidCredentialsException()
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return{
        token,
        user: { id: user.id, email: user.email, name: user.name, currency: user.currency }
    }
}

module.exports = { 
    register,
    login
}