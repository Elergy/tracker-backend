const Project = require('./../project-model');

/**
 * get information about a project with an owner and all participants
 * @param projectId
 * @returns {Promise.<Object>}
 */
function getProjectInfo(projectId) {
    return Project
        .findById(projectId, '-__v -participants._id')
        .populate({
            path: 'owner',
            select: '_id name'
        })
        .populate({
            path: 'participants.participant',
            select: '_id name'
        })
        .exec();
}

module.exports = getProjectInfo;