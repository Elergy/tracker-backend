const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    color: {type: Number, required: true},
    isActive: {type: Boolean, default: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Project', schema);