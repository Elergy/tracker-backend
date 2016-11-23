const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {type: String, index: { unique: true }},
    password: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

module.exports = mongoose.model('User', schema);