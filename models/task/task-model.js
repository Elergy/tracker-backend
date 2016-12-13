const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String
    }],
    start_time: Number,
    end_time: Number
});

module.exports = mongoose.model('Task', schema);