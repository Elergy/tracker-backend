const getHashByPassword = require('./../utils/get-hash-by-password');

function isPasswordValid(user, password) {
    return user.password === getHashByPassword(password); 
}

module.exports = isPasswordValid;