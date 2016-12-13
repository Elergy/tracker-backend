module.exports = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(new Error('User is unauthenticated'));
    }
};