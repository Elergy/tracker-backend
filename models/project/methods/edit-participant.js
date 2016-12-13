const getProjectInfo = require('./../utils/get-project-info');
const {
    hasAdminRights,
    isOwner,
} = require('./../utils/validate-rights');

/**
 * Edit information about a participant
 * @param {ObjectId} userId
 * @param {Number} projectId
 * @param {Number} participantId
 * @param {Object} participantData
 * @param {String} participantData.role - admin or user
 * @returns {Object} - information about project
 */
async function editParticipant(userId, projectId, participantId, participantData) {
    const project = await getProjectInfo(projectId);

    if (!project) {
        throw new Error('A project is not found');
    }

    if (isOwner(project, participantId)) {
        throw new Error('You can not edit an owner');
    }

    if (!hasAdminRights(project, userId)) {
        throw new Error('Current user has no permissions to edit the project');
    }

    const participant = project.participants.find(({participant}) => {
        return participant._id.equals(participantId);
    });

    if (participant && participantData.role) {
        participant.role = participantData.role;
    }

    await project.save();
    return getProjectInfo(projectId);
}

module.exports = editParticipant;