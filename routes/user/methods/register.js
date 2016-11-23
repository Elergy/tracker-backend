const User = require('./../../../models/user/user');

async function register(req, res, next) {
    try {
        await User.add(req.body);
        res.json({
            ok: true
        });
    } catch(ex) {
        next(ex);
    }
}

module.exports = register;