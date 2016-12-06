const _getProjectInfo = require('./../utils/_get-project-info');
const {isParticipant} = require('./../utils/_validate-rights');

/**
 * Get data about the project
 * @param {ObjectId} userId
 * @param {ObjectId} projectId
 * @returns {Object}
 */
async function getInfo(userId, projectId) {
    const project = await _getProjectInfo(projectId);
    if (!project) {
        throw new Error('A project is not found');
    }

    if (isParticipant(project, userId)) {
        return project;
    }

    throw new Error('Current user has no permissions to read the project');
}

module.exports = getInfo;