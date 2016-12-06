/**
 * @typedef {Object} Project
 *
 * @property {Object} owner
 * @property {ObjectId} owner_id
 *
 * @property {Object[]} project.participants
 * @property {Object} project.participants[].participant
 * @property {ObjectId} project.participants[].participant._id
 * @property {String} project.participants[].role (admin or user)
 */

/**
 * Return true, if a project has a participant with admin rights and ._id equals to userId
 *
 * @param {Project} project
 * @param {Number} userId
 * @returns {boolean}
 */
function hasAdminRights(project, userId) {
    const {participants: participantsInfo} = project;

    const currentParticipantInfo = participantsInfo.find((info) => {
        return info.participant._id.equals(userId);
    });

    return !!(currentParticipantInfo && currentParticipantInfo.role === 'admin');
}

/**
 * Return true if a project has a participants with given id
 *
 * @param {Project} project
 * @param {Number} userId
 * @returns {*|boolean}
 */
function isParticipant(project, userId) {
    const {participants: participantsInfo} = project;

    return participantsInfo.some((info) => {
        return info.participant._id.equals(userId);
    });
}

/**
 * Return true, if a project has an owner with given userId
 *
 * @param {Project} project
 * @param {Number} userId
 * @returns {boolean}
 */
function isOwner(project, userId) {
    return project.owner._id.equals(userId);
}

module.exports = {
    hasAdminRights,
    isParticipant,
    isOwner
};