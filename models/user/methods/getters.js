const assert = require('assert');

const UserModel = require('./../user-model');

function getByEmail(email) {
    assert(email, 'email is empty');

    return UserModel.findOne({email}).exec();
}

function getById(id) {
    assert(id, 'id is empty');

    return UserModel.findById(id).exec();
}

module.exports = {
    getByEmail,
    getById
};