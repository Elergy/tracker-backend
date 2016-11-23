const {Router} = require('express');

const register = require('./methods/register');
const login = require('./methods/login');

const router = new Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;