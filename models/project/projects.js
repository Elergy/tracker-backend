const {
    getByEmail,
    getById
} = require('./methods/getters');

module.exports = {
    add: require('./methods/add'),
    isPasswordValid: require('./methods/is-password-valid'),
    getByEmail,
    getById
};