const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    getByEmail,
    getById,
    isPasswordValid
} = require('./../models/user/user');

const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    
    async(email, password, done) => {
        try {
            const user = await getByEmail(email);

            if (user && isPasswordValid(user, password)) {
                done(null, user);
            } else {
                done(null, false, {message: 'Auth Error'});
            }
        } catch (ex) {
            done(ex);
        }
    });

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await getById(id);
        if (user) {
            done(null, user);
        }
    } catch (ex) {
        done(ex);
    }
});

passport.use(strategy);