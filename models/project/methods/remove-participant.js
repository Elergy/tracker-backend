const _getProjectInfo = require('./../utils/_get-project-info');
const {
    hasAdminRights,
    isOwner,
} = require('./../utils/_validate-rights');

/**
 * Remove a participant
 * @param {ObjectId} userId
 * @param {Number} projectId
 * @param {Number} participantId
 * @returns {Object} - information about project
 */
async function removeParticipant(userId, projectId, participantId) {
    const project = await _getProjectInfo(projectId);

    if (!project) {
        throw new Error('A project is not found');
    }

    if (isOwner(project, participantId)) {
        throw new Error('You can not remove an owner');
    }

    if (!hasAdminRights(project, userId)) {
        throw new Error('Current user has no permissions to edit the project');
    }

    project.participants = project.participants.filter(({participant}) => {
        return !participant._id.equals(participantId);
    });

    await project.save();
    return _getProjectInfo(projectId);
}

module.exports = removeParticipant;