const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    color: {type: String, required: true},
    is_active: {type: Boolean, default: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [
        {
            participant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {type: String, default: 'user'}
        }
    ]
});

module.exports = mongoose.model('Project', schema);