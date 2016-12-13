const getProjectInfo = require('./../utils/get-project-info');
const {
    hasAdminRights,
    isOwner,
} = require('./../utils/validate-rights');

/**
 * Remove a participant
 * @param {ObjectId} userId
 * @param {Number} projectId
 * @param {Number} participantId
 * @returns {Object} - information about project
 */
async function removeParticipant(userId, projectId, participantId) {
    const project = await getProjectInfo(projectId);

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
    return getProjectInfo(projectId);
}

module.exports = removeParticipant;