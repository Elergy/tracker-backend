const passport = require('passport');
const {Router} = require('express');
const create = require('./../models/user/methods/create');

const router = new Router();

router.post('/register', async(req, res, next) => {
    try {
        await create(req.body);
        res.json({
            ok: true
        });
    } catch (ex) {
        next(ex);
    }
});

router.post('/login',
    passport.authenticate('local'),
    (req, res) => res.json({
        ok: true
    })
);

router.get('/init-test',
    (req, res, next) => {
        req.query.email = 'test@test.com';
        req.query.password = '123456';

        next();
    },
    passport.authenticate('local'),
    (req, res) => res.json({
        ok: true
    })
);

module.exports = router;