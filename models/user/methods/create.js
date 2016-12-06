const assert = require('assert');

const UserModel = require('./../user-model');
const getHashByPassword = require('./../utils/get-hash-by-password');

function create(userData) {
    const {
        email,
        password,
        name
    } = userData;

    assert(email, 'email is empty');
    assert(password, 'password is empty');
    assert(name, 'name is empty');

    const user = new UserModel({
        email,
        name,
        password: getHashByPassword(password)
    });

    return user.save();
}

module.exports = create;