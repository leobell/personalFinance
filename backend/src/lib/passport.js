const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { findOrCreateGoogleUser } = require('../modules/auth/auth.service')

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await findOrCreateGoogleUser({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName
                })

                done(null, user)
            } catch (err) {
                done(err, null)
            }
        }
    )
)

module.exports = passport