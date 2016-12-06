const assert = require('assert');
const Ajv = require('ajv');
const ajv = new Ajv();

const projectSchema = require('./../utils/project.schema');
const _getProjectInfo = require('./../utils/_get-project-info');
const {
    hasAdminRights,
    isParticipant,
} = require('./../utils/_validate-rights');
const {getById: getUserById} = require('./../../user/user');

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
    const project = await _getProjectInfo(projectId);

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

    assert(ajv.validate(projectSchema, project), ajv.errorsText());

    await project.save();
    return _getProjectInfo(projectId);
}

module.exports = addParticipant;