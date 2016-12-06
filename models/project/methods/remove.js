const Project = require('./../project-model');

/**
 * Remove the project
 * @param {ObjectId} userId
 * @param {ObjectId} projectId
 * @returns {Promise}
 */
function remove(userId, projectId) {
    return Project.findOneAndRemove({
        owner: userId,
        _id: projectId
    }).exec();
}

module.exports = remove;