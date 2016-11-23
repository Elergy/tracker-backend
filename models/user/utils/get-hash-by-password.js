const crypto = require('crypto');

function getHashByPassword(password) {
    return crypto.createHmac('sha256', process.env.password_crypto_secret)
        .update(password)
        .digest('hex');
}

module.exports = getHashByPassword;