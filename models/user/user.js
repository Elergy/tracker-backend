const {
    getByEmail,
    getById
} = require('./methods/getters');

module.exports = {
    create: require('./methods/create'),
    isPasswordValid: require('./methods/is-password-valid'),
    getByEmail,
    getById
};