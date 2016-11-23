const passport = require('passport');

module.exports = [
    passport.authenticate('local'),
    (req, res) => res.json({
        ok: true
    })
];