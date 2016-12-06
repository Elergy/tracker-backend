const Project = require('./../project-model');

/**
 * get all projects for current user
 * @param {ObjectId} userId
 */
function getAll(userId) {
    return Project.find({
            owner: userId
        },
        'id title color is_active'
    ).exec();
}

module.exports = getAll;