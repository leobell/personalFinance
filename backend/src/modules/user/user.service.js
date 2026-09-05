const prisma = require('../../lib/prisma')
const bcrypt = require('bcrypt')
const IncorrectPasswordException  = require('../../exceptions/user/IncorrectPasswordException')
const PasswordChangeNotAllowedException = require('../../exceptions/user/PasswordChangeNotAllowedException')
const SALT_ROUNDS = 10

const getMe = async(userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        provider: user.provider
    }
}

const updateProfile = async(userId, { name, currency }) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { name, currency }
    })

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        currency: user.currency,
        provider: user.provider
    }
}

const updatePassword = async(userId, { currentPassword, newPassword }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user.passwordHash) {
        throw new PasswordChangeNotAllowedException()
    }

    const valid = await bcrypt.compare(currentPassword, user.passwordHash)

    if (!valid) {
        throw new IncorrectPasswordException()
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await prisma.user.update({
        where: { id: userId },
        data: { passwordHash }
    })
} 

const deleteAccount = async(userId) => {
    await prisma.user.delete({ where: { id: userId } })
}

module.exports = {
    getMe,
    updateProfile,
    updatePassword,
    deleteAccount
}