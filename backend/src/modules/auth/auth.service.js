const bcrypt = require('bcrypt')
const crypto = require('crypto')
const resend = require('../../lib/resend')
const jwt = require('jsonwebtoken')
const prisma = require('../../lib/prisma')
const InvalidResetTokenException = require('../../exceptions/auth/InvalidResetTokenException')
const EmailAlreadyInUseException = require('../../exceptions/auth/EmailAlreadyInUseException')
const InvalidCredentialsException = require('../../exceptions/auth/InvalidCredentialsException')
const InvalidVerificationTokenException = require('../../exceptions/auth/InvalidVerificationTokenException')
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

    await sendVerificationEmail(user)

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, currency: user.currency, provider: user.provider, emailVerified: user.emailVerified },
    }
}


const login = async({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } })

    if(!user || !user.passwordHash){
        throw new InvalidCredentialsException()
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if(!valid){
        throw new InvalidCredentialsException()
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, currency: user.currency, provider: user.provider, emailVerified: user.emailVerified }
    }
}

const findOrCreateGoogleUser = async({ googleId, email, name }) => {
    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing) {
        if (existing.provider !== 'google') {
            throw new EmailAlreadyInUseException(
                'This email is already registered with a password. Please log in with your password instead.'
            )
        }

        return existing
    }

    return prisma.user.create({
        data: { email, name, provider: 'google', providerId: googleId, emailVerified: true }
    })
}

const forgotPassword = async(email) => {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !user.passwordHash) {
        return
    }

    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000)

    await prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordToken: hashedToken, resetPasswordExpires: expires }
    })

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

    const { error } = await resend.emails.send({
        from: 'noreply@flowlyfinance.app',
        to: email,
        subject: 'Reimposta la tua password - Flowly',
        html: `<p>Hai richiesto di reimpostare la password del tuo account Flowly.</p><p><a href="${resetUrl}">Clicca qui per reimpostarla</a></p><p>Il link scade tra un'ora. Se non hai richiesto tu questo cambio, ignora questa email.</p>`
    })

    if (error) {
        console.error('Resend error:', error)
    }

}

const resetPassword = async ({ token, newPassword }) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() }
        }
    })

    if (!user) {
        throw new InvalidResetTokenException()
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            passwordHash,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    })
}

const sendVerificationEmail = async (user) => {
    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerificationToken: hashedToken, emailVerificationExpires: expires }
    })

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`

    const { error } = await resend.emails.send({
        from: 'noreply@flowlyfinance.app',
        to: user.email,
        subject: 'Conferma la tua email - Flowly',
        html: `<p>Ciao ${user.name}, conferma la tua email per completare la registrazione su Flowly.</p><p><a href="${verifyUrl}">Clicca qui per confermare</a></p><p>Il link scade tra 24 ore.</p>`
    })

    if (error) {
        console.error('Resend error:', error)
    }
}

const verifyEmail = async(token) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findFirst({
        where: {
            emailVerificationToken: hashedToken,
            emailVerificationExpires: { gt: new Date() }
        }
    })

    if (!user) {
        throw new InvalidVerificationTokenException()
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
            emailVerificationToken: null,
            emailVerificationExpires: null
        }
    })
}

const resendVerification = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || user.emailVerified) {
        return
    }

    await sendVerificationEmail(user)
}


module.exports = { 
    register,
    login,
    findOrCreateGoogleUser,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    resendVerification
}