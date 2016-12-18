const Project = require('./../project-model');
const {getById: getUserById} = require('./../../user/methods/getters');
const validateSchema = require('./../utils/validate-schema');

/**
 * create a new Project for the user
 * @param {ObjectId} userId
 * @param {Object} projectInfo
 * @param {String} projectInfo.title
 * @param {String} [projectInfo.color] - e.g. "#ff00ff"
 */
async function create(userId, projectInfo) {
    const user = await getUserById(userId);

    Object.assign(projectInfo, {
        owner: user,
        participants: [{
            participant: user,
            role: 'admin'
        }],
        is_active: true
    });

    if (!projectInfo.color) {
        projectInfo.color = '#ff0000';
    }

    if (!validateSchema(projectInfo)) {
        throw new Error('Project has invalid format');
    }

    const project = new Project(projectInfo);

    return project
        .save()
        .then((project) => {
            return {
                _id: project._id,
                title: project.title,
                color: project.color,
                is_active: project.is_active
            };
        });
}

module.exports = create;