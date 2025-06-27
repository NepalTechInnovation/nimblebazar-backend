const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authService = require("../auth/authService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateToken } = require('../../utils/jwtUtils');
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { googleId: profile.id },
                });

                if (!user) {
                    const result = await authService.findOrCreateGoogleUser(profile);
                    return done(null, result);
                }

                const token = await generateToken(user);
                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }

    ));

passport.serializeUser((data, done) => done(null, data));
passport.deserializeUser((data, done) => done(null, data));
