const assert = require('assert');

const UserModel = require('./../user-model');
const getHashByPassword = require('./../utils/get-hash-by-password');

function add(userData) {
    const {
        email,
        password
    } = userData;

    assert(email, 'email is empty');
    assert(password, 'password is empty');

    const user = new UserModel({
        email,
        password: getHashByPassword(password)
    });

    return user.save();
}

module.exports = add;