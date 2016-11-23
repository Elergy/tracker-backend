const mongoose = require('mongoose');

/**
 * connect to MongoDB using process.env.mongo_address
 * @returns {Promise}
 */
function connectToMongo() {
    return new Promise((resolve, reject) => {
        const {connection} = mongoose;
        
        connection.on('error', (err) => {
            reject(err);
        });
        
        connection.once('open', () => {
            resolve(connection);
        });

        mongoose.connect(process.env.mongo_address);
    });
}

module.exports = connectToMongo;

