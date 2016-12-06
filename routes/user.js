const passport = require('passport');
const {Router} = require('express');

const router = new Router();

router.post('/register', async(req, res, next) => {
    try {
        await User.create(req.body);
        res.json({
            ok: true
        });
    } catch (ex) {
        next(ex);
    }
});

router.post('/login', [
    passport.authenticate('local'),
    (req, res) => res.json({
        ok: true
    })
]);

module.exports = router;