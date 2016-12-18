const getProjectInfo = require('./../utils/get-project-info');
const {
    hasAdminRights,
    isParticipant,
} = require('./../utils/validate-rights');
const {getById: getUserById} = require('./../../user/methods/getters');
const validateSchema = require('./../utils/validate-schema');

/**
 * Add a new participant to a project
 * @param {ObjectId} userId
 * @param {Number} projectId
 * @param {Object} participantInfo
 * @param {Number} participantInfo.participant_id
 * @param {String} [participantInfo.role='user']
 * @returns {Promise.<Object>}
 */
async function addParticipant(userId, projectId, participantInfo) {
    const project = await getProjectInfo(projectId);

    if (!project) {
        throw new Error('A project is not found');
    }

    if (!hasAdminRights(project, userId)) {
        throw new Error('Current user has no permissions to edit the project');
    }

    if (isParticipant(project, participantInfo.participant_id)) {
        throw new Error('A user is already added to participants list');
    }

    const participant = await getUserById(participantInfo.participant_id);
    if (!participant) {
        throw new Error('A user is not found');
    }

    project.participants.push({
        participant,
        role: participantInfo.role
    });

    if (!validateSchema(project)) {
        throw new Error('Project has invalid format');
    }

    await project.save();
    return getProjectInfo(projectId);
}

module.exports = addParticipant;